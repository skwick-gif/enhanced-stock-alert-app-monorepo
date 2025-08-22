from fastapi import FastAPI, HTTPException, WebSocket
from pydantic import BaseModel
import requests
from dateutil.parser import parse
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from sklearn.linear_model import LogisticRegression
import numpy as np
import asyncio

load_dotenv()
API_KEY = os.getenv("API_KEY", "demo")
FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY", "demo")

app = FastAPI()

# Mock AI model
model = LogisticRegression()
X_train = np.array([[0.1], [0.3], [-0.2], [-0.5], [0.4]])
y_train = np.array([1, 1, 0, 0, 1])
model.fit(X_train, y_train)

@app.get("/health")
async def health():
    return {"status": "ok", "finnhub_key": FINNHUB_API_KEY[:4] + "..."}

class StockFilter(BaseModel):
    symbol: str | None = None
    min_price: float | None = None
    max_price: float | None = None

@app.post("/screen/stocks")
async def screen_stocks(filter: StockFilter):
    symbol = filter.symbol or "AAPL"
    try:
        url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={API_KEY}"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        if "Global Quote" not in data:
            raise HTTPException(status_code=404, detail="Stock data not found")
        price = float(data["Global Quote"]["05. price"])
        if (filter.min_price and price < filter.min_price) or (filter.max_price and price > filter.max_price):
            return {"symbol": symbol, "price": price, "filtered_out": True}
        return {"symbol": symbol, "price": price, "filtered_out": False}
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching stock data: {str(e)}")

class ReportFilter(BaseModel):
    symbol: str | None = None
    days_ahead: int = 7

@app.post("/reports/upcoming")
async def upcoming_reports(filter: ReportFilter):
    symbol = filter.symbol or "AAPL"
    try:
        url = f"https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&symbol={symbol}&horizon=3month&apikey={API_KEY}"
        response = requests.get(url)
        response.raise_for_status()
        try:
            data = response.json()
            if not data or "earningsCalendar" not in data:
                raise HTTPException(status_code=404, detail="Earnings data not found")
            upcoming = []
            today = datetime.now()
            threshold = today + timedelta(days=filter.days_ahead)
            for event in data["earningsCalendar"]:
                try:
                    report_date = parse(event["reportDate"])
                    if today <= report_date <= threshold:
                        upcoming.append({
                            "symbol": event["symbol"],
                            "reportDate": event["reportDate"],
                            "estimate": event.get("epsEstimate", "N/A")
                        })
                except (KeyError, ValueError):
                    continue
            return {"symbol": symbol, "upcoming_reports": upcoming, "message": "No upcoming reports found" if not upcoming else ""}
        except ValueError:
            lines = response.text.splitlines()
            upcoming = []
            today = datetime.now()
            threshold = today + timedelta(days=filter.days_ahead)
            for line in lines[1:]:
                try:
                    parts = line.split(",")
                    if len(parts) < 3:
                        continue
                    symbol, report_date, eps_estimate = parts[0], parts[3], parts[4]
                    report_date = parse(report_date)
                    if today <= report_date <= threshold:
                        upcoming.append({
                            "symbol": symbol,
                            "reportDate": report_date.strftime("%Y-%m-%d"),
                            "estimate": eps_estimate or "N/A"
                        })
                except (IndexError, ValueError):
                    continue
            return {"symbol": symbol, "upcoming_reports": upcoming, "message": "No upcoming reports found" if not upcoming else ""}
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching earnings data: {str(e)}")

class NewsFilter(BaseModel):
    keywords: str | None = "Federal Reserve, FOMC, Fed speech"
    days_ahead: int = 7

@app.post("/news/track")
async def track_news(filter: NewsFilter):
    try:
        today = datetime.now()
        from_date = today.strftime("%Y-%m-%d")
        to_date = (today + timedelta(days=filter.days_ahead)).strftime("%Y-%m-%d")
        url = f"https://finnhub.io/api/v1/news?category=general&from={from_date}&to={to_date}&token={FINNHUB_API_KEY}"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        if not isinstance(data, list):
            raise HTTPException(status_code=404, detail=f"Unexpected response format: {data}")
        relevant_news = []
        keywords = filter.keywords.split(",") if filter.keywords else ["Federal Reserve", "FOMC", "Fed speech"]
        for item in data:
            headline = item.get("headline", "").lower()
            summary = item.get("summary", "").lower()
            sentiment_score = 0.0
            if any(keyword.strip().lower() in headline + summary for keyword in keywords):
                prediction = model.predict([[sentiment_score]])[0]
                probability = model.predict_proba([[sentiment_score]])[0][prediction]
                relevant_news.append({
                    "headline": item.get("headline", ""),
                    "summary": item.get("summary", ""),
                    "date": item.get("datetime", ""),
                    "source": item.get("source", ""),
                    "url": item.get("url", ""),
                    "market_movement_prediction": "up" if prediction == 1 else "down",
                    "confidence": float(probability)
                })
        return {"news": relevant_news, "message": "No relevant news found" if not relevant_news else ""}
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching news data: {str(e)}")

@app.websocket("/ws/alerts")
async def websocket_alerts(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Mock real-time stock price check
            symbol = "AAPL"
            url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={API_KEY}"
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
            if "Global Quote" in data:
                price = float(data["Global Quote"]["05. price"])
                alert = {
                    "type": "price_alert",
                    "symbol": symbol,
                    "price": price,
                    "timestamp": datetime.now().isoformat()
                }
                await websocket.send_json(alert)
            await asyncio.sleep(60)  # Check every minute
    except Exception as e:
        await websocket.send_json({"error": str(e)})
    finally:
        await websocket.close()