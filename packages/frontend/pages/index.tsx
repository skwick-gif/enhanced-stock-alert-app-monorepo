import { useState, useEffect } from 'react';

interface StockData {
  symbol: string;
  price: number;
  filtered_out: boolean;
}

interface Report {
  symbol: string;
  reportDate: string;
  estimate: string;
}

interface News {
  headline: string;
  summary: string;
  date: string;
  source: string;
  url: string;
  market_movement_prediction: string;
  confidence: number;
}

interface Alert {
  type: string;
  symbol: string;
  price: number;
  timestamp: string;
}

export default function Home() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Fetch stock screening data
    fetch('http://localhost:8000/screen/stocks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol: 'AAPL', min_price: 100, max_price: 200 })
    })
      .then(res => res.json())
      .then(data => setStocks([data]))
      .catch(err => console.error(err));

    // Fetch upcoming reports
    fetch('http://localhost:8000/reports/upcoming', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol: 'AAPL', days_ahead: 7 })
    })
      .then(res => res.json())
      .then(data => setReports(data.upcoming_reports || []))
      .catch(err => console.error(err));

    // Fetch news
    fetch('http://localhost:8000/news/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keywords: 'Federal Reserve', days_ahead: 7 })
    })
      .then(res => res.json())
      .then(data => setNews(data.news || []))
      .catch(err => console.error(err));

    // WebSocket for real-time alerts
    const ws = new WebSocket('ws://localhost:8000/ws/alerts');
    ws.onopen = () => console.log('WebSocket connected');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.error) {
        console.error(data.error);
      } else {
        setAlerts(prev => [...prev, data].slice(-10)); // Keep last 10 alerts
      }
    };
    ws.onclose = () => console.log('WebSocket disconnected');
    return () => ws.close();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stock & Options Screener Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Stock Screening Results</h2>
        <ul className="list-disc pl-5">
          {stocks.map((stock, index) => (
            <li key={index}>
              {stock.symbol}: ${stock.price.toFixed(2)} {stock.filtered_out ? '(Filtered Out)' : '(Matches Criteria)'}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Upcoming Reports</h2>
        <ul className="list-disc pl-5">
          {reports.map((report, index) => (
            <li key={index}>
              {report.symbol}: Report on {report.reportDate}, EPS Estimate: {report.estimate}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold">News Alerts</h2>
        <ul className="list-disc pl-5">
          {news.map((item, index) => (
            <li key={index}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                {item.headline}
              </a> ({item.source}, {item.date}) - Prediction: {item.market_movement_prediction} (Confidence: {(item.confidence * 100).toFixed(2)}%)
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Real-Time Alerts</h2>
        <ul className="list-disc pl-5">
          {alerts.map((alert, index) => (
            <li key={index}>
              {alert.type}: {alert.symbol} at ${alert.price.toFixed(2)} on {alert.timestamp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}