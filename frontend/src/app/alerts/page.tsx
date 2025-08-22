'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AlertList from '@/components/AlertList'
import { Alert, CreateAlertRequest, UpdateAlertRequest } from '@/shared/types'

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null)
  const [formData, setFormData] = useState<CreateAlertRequest>({
    assetId: '',
    type: 'price_above',
    targetValue: 0
  })
  const [editFormData, setEditFormData] = useState<UpdateAlertRequest>({})
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:8000/alerts')
      if (!response.ok) {
        throw new Error('Failed to fetch alerts')
      }
      const data = await response.json()
      setAlerts(data.alerts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      // Fallback to mock data for demo
      setAlerts([
        {
          id: '1',
          assetId: 'asset_1',
          assetSymbol: 'AAPL',
          type: 'price_below',
          targetValue: 150.00,
          isActive: true,
          createdAt: new Date().toISOString(),
          triggeredAt: new Date().toISOString()
        },
        {
          id: '2',
          assetId: 'asset_2',
          assetSymbol: 'GOOGL',
          type: 'price_above',
          targetValue: 140.00,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          assetId: 'asset_3',
          assetSymbol: 'TSLA',
          type: 'percentage_change',
          targetValue: 5.0,
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const createAlert = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create alert')
      }
      
      const newAlert = await response.json()
      setAlerts(prev => [...prev, newAlert])
      setShowCreateForm(false)
      setFormData({ assetId: '', type: 'price_above', targetValue: 0 })
    } catch (err) {
      console.error('Error creating alert:', err)
      // For demo purposes, create a mock alert
      const mockAlert: Alert = {
        id: Date.now().toString(),
        assetId: formData.assetId,
        assetSymbol: formData.assetId.toUpperCase(),
        type: formData.type,
        targetValue: formData.targetValue,
        isActive: true,
        createdAt: new Date().toISOString()
      }
      setAlerts(prev => [...prev, mockAlert])
      setShowCreateForm(false)
      setFormData({ assetId: '', type: 'price_above', targetValue: 0 })
    }
  }

  const handleEditAlert = (alert: Alert) => {
    setEditingAlert(alert)
    setEditFormData({
      assetId: alert.assetId,
      type: alert.type,
      targetValue: alert.targetValue,
      isActive: alert.isActive
    })
    setShowEditForm(true)
    setShowCreateForm(false)
  }

  const updateAlert = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingAlert) return

    try {
      const response = await fetch(`http://localhost:8000/alerts/${editingAlert.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update alert')
      }
      
      const updatedAlert = await response.json()
      setAlerts(prev => prev.map(alert => 
        alert.id === editingAlert.id ? updatedAlert : alert
      ))
      setShowEditForm(false)
      setEditingAlert(null)
      setEditFormData({})
    } catch (err) {
      console.error('Error updating alert:', err)
      // For demo purposes, update locally
      const updatedAlert: Alert = {
        ...editingAlert,
        assetId: editFormData.assetId || editingAlert.assetId,
        assetSymbol: editFormData.assetId ? editFormData.assetId.toUpperCase() : editingAlert.assetSymbol,
        type: editFormData.type || editingAlert.type,
        targetValue: editFormData.targetValue !== undefined ? editFormData.targetValue : editingAlert.targetValue,
        isActive: editFormData.isActive !== undefined ? editFormData.isActive : editingAlert.isActive
      }
      setAlerts(prev => prev.map(alert => 
        alert.id === editingAlert.id ? updatedAlert : alert
      ))
      setShowEditForm(false)
      setEditingAlert(null)
      setEditFormData({})
    }
  }

  const handleDeleteAlert = async (alertId: string) => {
    if (deleteConfirm === alertId) {
      try {
        const response = await fetch(`http://localhost:8000/alerts/${alertId}`, {
          method: 'DELETE',
        })
        
        if (!response.ok) {
          throw new Error('Failed to delete alert')
        }
        
        setAlerts(prev => prev.filter(alert => alert.id !== alertId))
        setDeleteConfirm(null)
      } catch (err) {
        console.error('Error deleting alert:', err)
        // For demo purposes, delete locally
        setAlerts(prev => prev.filter(alert => alert.id !== alertId))
        setDeleteConfirm(null)
      }
    } else {
      setDeleteConfirm(alertId)
      // Auto-clear confirmation after 3 seconds
      setTimeout(() => setDeleteConfirm(null), 3000)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Alert Center</h1>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="mb-6">
        <button
          onClick={() => {
            setShowCreateForm(!showCreateForm)
            setShowEditForm(false)
            setEditingAlert(null)
          }}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors mr-4"
        >
          {showCreateForm ? 'Cancel' : 'Create New Alert'}
        </button>
        {showEditForm && (
          <button
            onClick={() => {
              setShowEditForm(false)
              setEditingAlert(null)
              setEditFormData({})
            }}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Alert</h2>
          <form onSubmit={createAlert} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asset Symbol
              </label>
              <input
                type="text"
                value={formData.assetId}
                onChange={(e) => setFormData(prev => ({ ...prev, assetId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., AAPL"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alert Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="price_above">Price Above</option>
                <option value="price_below">Price Below</option>
                <option value="percentage_change">Percentage Change</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Value
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.targetValue}
                onChange={(e) => setFormData(prev => ({ ...prev, targetValue: parseFloat(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 150.00"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Alert
            </button>
          </form>
        </div>
      )}

      {showEditForm && editingAlert && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Alert: {editingAlert.assetSymbol}</h2>
          <form onSubmit={updateAlert} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asset Symbol
              </label>
              <input
                type="text"
                value={editFormData.assetId || ''}
                onChange={(e) => setEditFormData(prev => ({ ...prev, assetId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., AAPL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alert Type
              </label>
              <select
                value={editFormData.type || ''}
                onChange={(e) => setEditFormData(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="price_above">Price Above</option>
                <option value="price_below">Price Below</option>
                <option value="percentage_change">Percentage Change</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Value
              </label>
              <input
                type="number"
                step="0.01"
                value={editFormData.targetValue || ''}
                onChange={(e) => setEditFormData(prev => ({ ...prev, targetValue: parseFloat(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 150.00"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={editFormData.isActive !== undefined ? editFormData.isActive : true}
                onChange={(e) => setEditFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                Active
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update Alert
            </button>
          </form>
        </div>
      )}

      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Backend connection failed. Showing demo data. Error: {error}
              </p>
            </div>
          </div>
        </div>
      )}

      <AlertList 
        alerts={alerts} 
        loading={loading} 
        onEdit={handleEditAlert}
        onDelete={handleDeleteAlert}
      />

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this alert? This action cannot be undone.
            </p>
            <div className="flex space-x-4 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAlert(deleteConfirm)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}