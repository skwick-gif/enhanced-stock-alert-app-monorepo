from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import uuid
from typing import List

from models import (
    Alert, 
    CreateAlertRequest, 
    UpdateAlertRequest,
    AlertResponse, 
    Score, 
    ScoreResponse, 
    HealthResponse,
    ScoreFactors
)
from storage import (
    load_alerts,
    save_alerts, 
    get_alert_by_id,
    update_alert,
    delete_alert,
    add_alert
)

app = FastAPI(
    title="Enhanced Stock Alert API",
    description="Backend API for the Enhanced Stock Alert App",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for scores (keeping as-is for demo)
scores_storage: List[Score] = []


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now().isoformat(),
        version="1.0.0"
    )


@app.get("/alerts", response_model=AlertResponse)
async def get_alerts():
    """Get all alerts"""
    alerts = load_alerts()
    return AlertResponse(
        alerts=alerts,
        total=len(alerts)
    )


@app.post("/alerts", response_model=Alert)
async def create_alert(alert_request: CreateAlertRequest):
    """Create a new alert"""
    # Validate alert type
    valid_types = ["price_above", "price_below", "percentage_change"]
    if alert_request.type not in valid_types:
        raise HTTPException(status_code=400, detail=f"Invalid alert type. Must be one of: {valid_types}")
    
    # Create new alert
    new_alert = Alert(
        id=str(uuid.uuid4()),
        assetId=alert_request.assetId,
        assetSymbol=f"SYMBOL_{alert_request.assetId}",  # Stub asset symbol
        type=alert_request.type,
        targetValue=alert_request.targetValue,
        isActive=True,
        createdAt=datetime.now().isoformat()
    )
    
    add_alert(new_alert)
    return new_alert


@app.get("/alerts/{alert_id}", response_model=Alert)
async def get_alert(alert_id: str):
    """Get a specific alert by ID"""
    alert = get_alert_by_id(alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert


@app.put("/alerts/{alert_id}", response_model=Alert)
async def update_alert_endpoint(alert_id: str, alert_request: UpdateAlertRequest):
    """Update an existing alert"""
    existing_alert = get_alert_by_id(alert_id)
    if not existing_alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    # Validate alert type if provided
    if alert_request.type is not None:
        valid_types = ["price_above", "price_below", "percentage_change"]
        if alert_request.type not in valid_types:
            raise HTTPException(status_code=400, detail=f"Invalid alert type. Must be one of: {valid_types}")
    
    # Update only provided fields
    updated_alert = existing_alert.copy()
    if alert_request.assetId is not None:
        updated_alert.assetId = alert_request.assetId
        updated_alert.assetSymbol = f"SYMBOL_{alert_request.assetId}"  # Update symbol too
    if alert_request.type is not None:
        updated_alert.type = alert_request.type
    if alert_request.targetValue is not None:
        updated_alert.targetValue = alert_request.targetValue
    if alert_request.isActive is not None:
        updated_alert.isActive = alert_request.isActive
    
    success = update_alert(alert_id, updated_alert)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to update alert")
    
    return updated_alert


@app.delete("/alerts/{alert_id}")
async def delete_alert_endpoint(alert_id: str):
    """Delete an alert"""
    success = delete_alert(alert_id)
    if not success:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    return {"message": "Alert deleted successfully"}


@app.get("/score", response_model=ScoreResponse)
async def get_scores():
    """Get all scores"""
    # Generate some stub scores if empty
    if not scores_storage:
        stub_scores = [
            Score(
                id=str(uuid.uuid4()),
                asset_id="asset_1",
                asset_symbol="AAPL",
                score=85.5,
                factors=ScoreFactors(volatility=0.25, momentum=0.65, volume=0.80),
                calculated_at=datetime.now().isoformat()
            ),
            Score(
                id=str(uuid.uuid4()),
                asset_id="asset_2",
                asset_symbol="GOOGL",
                score=78.2,
                factors=ScoreFactors(volatility=0.30, momentum=0.55, volume=0.70),
                calculated_at=datetime.now().isoformat()
            ),
            Score(
                id=str(uuid.uuid4()),
                asset_id="asset_3",
                asset_symbol="TSLA",
                score=92.1,
                factors=ScoreFactors(volatility=0.45, momentum=0.85, volume=0.90),
                calculated_at=datetime.now().isoformat()
            )
        ]
        scores_storage.extend(stub_scores)
    
    return ScoreResponse(
        scores=scores_storage,
        total=len(scores_storage)
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)