import json
import os
from typing import List, Optional
from models import Alert

ALERTS_FILE = "alerts.json"

def load_alerts() -> List[Alert]:
    """Load alerts from JSON file"""
    if not os.path.exists(ALERTS_FILE):
        return []
    
    try:
        with open(ALERTS_FILE, 'r') as f:
            data = json.load(f)
            return [Alert(**alert) for alert in data]
    except (json.JSONDecodeError, FileNotFoundError):
        return []

def save_alerts(alerts: List[Alert]) -> None:
    """Save alerts to JSON file"""
    try:
        alert_dicts = [alert.dict() for alert in alerts]
        with open(ALERTS_FILE, 'w') as f:
            json.dump(alert_dicts, f, indent=2)
    except Exception as e:
        print(f"Error saving alerts: {e}")
        raise

def get_alert_by_id(alert_id: str) -> Optional[Alert]:
    """Get a specific alert by ID"""
    alerts = load_alerts()
    for alert in alerts:
        if alert.id == alert_id:
            return alert
    return None

def update_alert(alert_id: str, updated_alert: Alert) -> bool:
    """Update an existing alert"""
    alerts = load_alerts()
    for i, alert in enumerate(alerts):
        if alert.id == alert_id:
            alerts[i] = updated_alert
            save_alerts(alerts)
            return True
    return False

def delete_alert(alert_id: str) -> bool:
    """Delete an alert by ID"""
    alerts = load_alerts()
    original_length = len(alerts)
    alerts = [alert for alert in alerts if alert.id != alert_id]
    
    if len(alerts) < original_length:
        save_alerts(alerts)
        return True
    return False

def add_alert(alert: Alert) -> None:
    """Add a new alert"""
    alerts = load_alerts()
    alerts.append(alert)
    save_alerts(alerts)