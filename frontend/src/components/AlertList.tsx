import { Alert } from '@/shared/types'

interface AlertListProps {
  alerts: Alert[]
  loading: boolean
}

export default function AlertList({ alerts, loading }: AlertListProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8">
          <div className="text-gray-400 text-5xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts yet</h3>
          <p className="text-gray-600">Create your first alert to get started</p>
        </div>
      </div>
    )
  }

  const getAlertStatusColor = (alert: Alert) => {
    if (alert.triggeredAt) return 'border-red-400 bg-red-50'
    if (alert.isActive) return 'border-green-400 bg-green-50'
    return 'border-gray-400 bg-gray-50'
  }

  const getAlertStatusText = (alert: Alert) => {
    if (alert.triggeredAt) return 'Triggered'
    if (alert.isActive) return 'Active'
    return 'Inactive'
  }

  const getAlertStatusTextColor = (alert: Alert) => {
    if (alert.triggeredAt) return 'text-red-600'
    if (alert.isActive) return 'text-green-600'
    return 'text-gray-600'
  }

  const formatAlertType = (type: string) => {
    switch (type) {
      case 'price_above':
        return 'Price Above'
      case 'price_below':
        return 'Price Below'
      case 'percentage_change':
        return 'Percentage Change'
      default:
        return type
    }
  }

  const formatTargetValue = (type: string, value: number) => {
    if (type === 'percentage_change') {
      return `${value}%`
    }
    return `$${value.toFixed(2)}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Your Alerts ({alerts.length})
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-6 border-l-4 ${getAlertStatusColor(alert)}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {alert.assetSymbol}
                  </h3>
                  <span className={`text-sm font-medium ${getAlertStatusTextColor(alert)}`}>
                    {getAlertStatusText(alert)}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Type:</span> {formatAlertType(alert.type)}
                  </p>
                  <p>
                    <span className="font-medium">Target:</span> {formatTargetValue(alert.type, alert.targetValue)}
                  </p>
                  <p>
                    <span className="font-medium">Created:</span> {formatDate(alert.createdAt)}
                  </p>
                  {alert.triggeredAt && (
                    <p>
                      <span className="font-medium">Triggered:</span> {formatDate(alert.triggeredAt)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 transition-colors text-sm font-medium">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}