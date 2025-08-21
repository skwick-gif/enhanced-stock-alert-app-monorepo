import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Enhanced Stock Alert App
        </h1>
        <p className="text-xl text-gray-600">
          Monitor stock prices and get alerts when they hit your targets
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Dashboard
          </h2>
          <p className="text-gray-600 mb-6">
            View your alerts, track performance, and manage your portfolio.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Alert Center
          </h2>
          <p className="text-gray-600 mb-6">
            Create and manage your stock price alerts.
          </p>
          <Link
            href="/alerts"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Manage Alerts
          </Link>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="text-gray-700">AAPL price alert triggered</span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="text-gray-700">New alert created for GOOGL</span>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="text-gray-700">TSLA scoring updated</span>
            <span className="text-sm text-gray-500">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}