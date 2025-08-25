const fs = require('fs');
const path = require('path');

const ALERTS_FILE = path.join(__dirname, '..', 'data', 'alerts.json');

/**
 * Read alerts from the JSON file
 * @returns {Array} Array of alert objects
 */
function readAlerts() {
  try {
    if (!fs.existsSync(ALERTS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(ALERTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading alerts file:', error);
    return [];
  }
}

/**
 * Write alerts to the JSON file
 * @param {Array} alerts - Array of alert objects to write
 */
function writeAlerts(alerts) {
  try {
    const dir = path.dirname(ALERTS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(ALERTS_FILE, JSON.stringify(alerts, null, 2));
  } catch (error) {
    console.error('Error writing alerts file:', error);
    throw error;
  }
}

module.exports = {
  readAlerts,
  writeAlerts
};