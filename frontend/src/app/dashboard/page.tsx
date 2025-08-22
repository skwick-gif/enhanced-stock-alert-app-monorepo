import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Alerts</h3>
          <p className="text-3xl font-bold text-blue-600">5</p>
          <p className="text-sm text-gray-600">2 triggered today</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Watched Assets</h3>
          <p className="text-3xl font-bold text-green-600">12</p>
          <p className="text-sm text-gray-600">across all portfolios</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Avg Score</h3>
          <p className="text-3xl font-bold text-purple-600">78.5</p>
          <p className="text-sm text-gray-600">portfolio performance</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Alerts</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-red-50 border-l-4 border-red-400 rounded">
                <div>
                  <p className="font-medium text-gray-900">AAPL</p>
                  <p className="text-sm text-gray-600">Price below $150.00</p>
                </div>
                <span className="text-sm font-medium text-red-600">Triggered</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <div>
                  <p className="font-medium text-gray-900">GOOGL</p>
                  <p className="text-sm text-gray-600">Price above $140.00</p>
                </div>
                <span className="text-sm font-medium text-yellow-600">Pending</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 border-l-4 border-green-400 rounded">
                <div>
                  <p className="font-medium text-gray-900">TSLA</p>
                  <p className="text-sm text-gray-600">Percentage change &gt; 5%</p>
                </div>
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/alerts"
                className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
              >
                View all alerts →
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Top Scored Assets</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">TSLA</p>
                  <p className="text-sm text-gray-600">Tesla Inc.</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">92.1</p>
                  <p className="text-xs text-gray-500">High momentum</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">AAPL</p>
                  <p className="text-sm text-gray-600">Apple Inc.</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">85.5</p>
                  <p className="text-xs text-gray-500">Stable growth</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">GOOGL</p>
                  <p className="text-sm text-gray-600">Alphabet Inc.</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-yellow-600">78.2</p>
                  <p className="text-xs text-gray-500">Moderate volatility</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}