const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readAlerts, writeAlerts } = require('../utils/fileOperations');

const router = express.Router();

/**
 * GET /alerts - List all alerts
 */
router.get('/alerts', (req, res) => {
  try {
    const alerts = readAlerts();
    res.json({
      alerts,
      total: alerts.length
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

/**
 * POST /alerts - Create a new alert
 */
router.post('/alerts', (req, res) => {
  try {
    const { asset_id, asset_symbol, type, target_value } = req.body;

    // Validate required fields
    if (!asset_id || !type || target_value === undefined) {
      return res.status(400).json({ 
        error: 'Missing required fields: asset_id, type, target_value' 
      });
    }

    // Validate alert type
    const validTypes = ['price_above', 'price_below', 'percentage_change'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ 
        error: `Invalid alert type. Must be one of: ${validTypes.join(', ')}` 
      });
    }

    // Create new alert
    const newAlert = {
      id: uuidv4(),
      asset_id,
      asset_symbol: asset_symbol || `SYMBOL_${asset_id}`,
      type,
      target_value: parseFloat(target_value),
      is_active: true,
      created_at: new Date().toISOString(),
      triggered_at: null
    };

    // Read existing alerts, add new one, and write back
    const alerts = readAlerts();
    alerts.push(newAlert);
    writeAlerts(alerts);

    res.status(201).json(newAlert);
  } catch (error) {
    console.error('Error creating alert:', error);
    res.status(500).json({ error: 'Failed to create alert' });
  }
});

/**
 * PUT /alerts/:id - Update an alert
 */
router.put('/alerts/:id', (req, res) => {
  try {
    const alertId = req.params.id;
    const { asset_id, asset_symbol, type, target_value, is_active } = req.body;

    const alerts = readAlerts();
    const alertIndex = alerts.findIndex(alert => alert.id === alertId);

    if (alertIndex === -1) {
      return res.status(404).json({ error: 'Alert not found' });
    }

    // Validate alert type if provided
    if (type) {
      const validTypes = ['price_above', 'price_below', 'percentage_change'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({ 
          error: `Invalid alert type. Must be one of: ${validTypes.join(', ')}` 
        });
      }
    }

    // Update alert fields
    const existingAlert = alerts[alertIndex];
    const updatedAlert = {
      ...existingAlert,
      ...(asset_id && { asset_id }),
      ...(asset_symbol && { asset_symbol }),
      ...(type && { type }),
      ...(target_value !== undefined && { target_value: parseFloat(target_value) }),
      ...(is_active !== undefined && { is_active })
    };

    alerts[alertIndex] = updatedAlert;
    writeAlerts(alerts);

    res.json(updatedAlert);
  } catch (error) {
    console.error('Error updating alert:', error);
    res.status(500).json({ error: 'Failed to update alert' });
  }
});

/**
 * DELETE /alerts/:id - Delete an alert
 */
router.delete('/alerts/:id', (req, res) => {
  try {
    const alertId = req.params.id;

    const alerts = readAlerts();
    const alertIndex = alerts.findIndex(alert => alert.id === alertId);

    if (alertIndex === -1) {
      return res.status(404).json({ error: 'Alert not found' });
    }

    const deletedAlert = alerts.splice(alertIndex, 1)[0];
    writeAlerts(alerts);

    res.json({ 
      message: 'Alert deleted successfully',
      alert: deletedAlert 
    });
  } catch (error) {
    console.error('Error deleting alert:', error);
    res.status(500).json({ error: 'Failed to delete alert' });
  }
});

module.exports = router;