from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()


class AlertCreate(BaseModel):
    """Model for creating new alerts"""
    symbol: str
    alert_type: str
    condition: str
    value: float
    message: str


class AlertResponse(BaseModel):
    """Model for alert responses"""
    id: str
    symbol: str
    alert_type: str
    condition: str
    value: float
    message: str
    status: str
    created_at: datetime
    triggered_at: datetime | None = None


# Temporary in-memory storage for demo purposes
alerts_storage: Dict[str, Dict[str, Any]] = {}


@router.get("/", response_model=List[AlertResponse])
async def get_alerts(skip: int = 0, limit: int = 100):
    """Get all alerts with pagination"""
    # Stub implementation - returns mock data
    mock_alerts = [
        {
            "id": "alert_001",
            "symbol": "AAPL",
            "alert_type": "price_above",
            "condition": "price > 150",
            "value": 150.0,
            "message": "AAPL price exceeded $150",
            "status": "active",
            "created_at": datetime.now(),
            "triggered_at": None
        },
        {
            "id": "alert_002", 
            "symbol": "TSLA",
            "alert_type": "price_below",
            "condition": "price < 200",
            "value": 200.0,
            "message": "TSLA price dropped below $200",
            "status": "active",
            "created_at": datetime.now(),
            "triggered_at": None
        }
    ]
    
    return mock_alerts[skip:skip + limit]


@router.post("/", response_model=AlertResponse)
async def create_alert(alert: AlertCreate):
    """Create a new stock alert"""
    # Stub implementation - generates mock response
    import uuid
    
    alert_id = str(uuid.uuid4())
    new_alert = {
        "id": alert_id,
        "symbol": alert.symbol,
        "alert_type": alert.alert_type,
        "condition": alert.condition,
        "value": alert.value,
        "message": alert.message,
        "status": "active",
        "created_at": datetime.now(),
        "triggered_at": None
    }
    
    # Store in temporary storage
    alerts_storage[alert_id] = new_alert
    
    return AlertResponse(**new_alert)


@router.get("/{alert_id}", response_model=AlertResponse)
async def get_alert(alert_id: str):
    """Get a specific alert by ID"""
    # Check temporary storage first
    if alert_id in alerts_storage:
        return AlertResponse(**alerts_storage[alert_id])
    
    # Return mock data for demo
    if alert_id == "alert_001":
        return AlertResponse(
            id="alert_001",
            symbol="AAPL",
            alert_type="price_above",
            condition="price > 150",
            value=150.0,
            message="AAPL price exceeded $150",
            status="active",
            created_at=datetime.now(),
            triggered_at=None
        )
    
    raise HTTPException(status_code=404, detail="Alert not found")


@router.delete("/{alert_id}")
async def delete_alert(alert_id: str):
    """Delete a specific alert"""
    # Remove from temporary storage if exists
    if alert_id in alerts_storage:
        del alerts_storage[alert_id]
        return {"message": f"Alert {alert_id} deleted successfully"}
    
    # For demo purposes, always return success
    return {"message": f"Alert {alert_id} deleted successfully"}


@router.put("/{alert_id}/toggle")
async def toggle_alert(alert_id: str):
    """Toggle alert active/inactive status"""
    # Stub implementation
    return {
        "message": f"Alert {alert_id} status toggled",
        "status": "active"  # Mock response
    }