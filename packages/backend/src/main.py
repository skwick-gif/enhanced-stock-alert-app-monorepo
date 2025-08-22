from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from dateutil.parser import parse
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("SO1ZX0M0XAMA6IPZ", "demo")  # Fallback to demo key

app = FastAPI()

@app.get("/health")
async def health():
    return {"status": "ok"}

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
        # Check if response is JSON or CSV
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
            # Handle CSV response
            lines = response.text.splitlines()
            upcoming = []
            today = datetime.now()
            threshold = today + timedelta(days=filter.days_ahead)
            for line in lines[1:]:  # Skip header
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