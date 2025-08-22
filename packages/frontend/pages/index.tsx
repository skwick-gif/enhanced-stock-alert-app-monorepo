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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('http://localhost:8000/screen/stocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: 'AAPL', min_price: 100, max_price: 200 })
      }),
      fetch('http://localhost:8000/reports/upcoming', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: 'AAPL', days_ahead: 7 })
      }),
      fetch('http://localhost:8000/news/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords: 'Federal Reserve', days_ahead: 7 })
      })
    ])
      .then(([stockRes, reportRes, newsRes]) =>
        Promise.all([stockRes.json(), reportRes.json(), newsRes.json()])
      )
      .then(([stockData, reportData, newsData]) => {
        setStocks([stockData]);
        setReports(reportData.upcoming_reports || []);
        setNews(newsData.news || []);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

    const ws = new WebSocket('ws://localhost:8000/ws/alerts');
    ws.onopen = () => console.log('WebSocket connected');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.error) console.error(data.error);
      else setAlerts(prev => [...prev, data].slice(-10));
    };
    ws.onclose = () => console.log('WebSocket disconnected');
    return () => ws.close();
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Stock & Options Screener Dashboard</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="mb-8 p-4 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Stock Screening Results</h2>
            <ul className="list-disc pl-5">
              {stocks.map((stock, index) => (
                <li key={index} className="py-1">
                  <span className="font-medium">{stock.symbol}:</span> ${stock.price.toFixed(2)}{' '}
                  <span className={stock.filtered_out ? 'text-red-500' : 'text-green-500'}>
                    {stock.filtered_out ? '(Filtered Out)' : '(Matches Criteria)'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8 p-4 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Upcoming Reports</h2>
            <ul className="list-disc pl-5">
              {reports.map((report, index) => (
                <li key={index} className="py-1">
                  <span className="font-medium">{report.symbol}:</span> Report on {report.reportDate}, EPS Estimate: {report.estimate}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8 p-4 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">News Alerts</h2>
            <ul className="list-disc pl-5">
              {news.map((item, index) => (
                <li key={index} className="py-1">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {item.headline}
                  </a>{' '}
                  ({item.source}, {item.date}) - Prediction: {item.market_movement_prediction} (Confidence: {(item.confidence * 100).toFixed(2)}%)
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Real-Time Alerts</h2>
            <ul className="list-disc pl-5">
              {alerts.map((alert, index) => (
                <li key={index} className="py-1">
                  <span className="font-medium">{alert.type}:</span> {alert.symbol} at ${alert.price.toFixed(2)} on {new Date(alert.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>Disclaimer: This app provides information for educational purposes only and is not financial advice. Consult a professional advisor before trading.</p>
      </footer>
    </div>
  );
}