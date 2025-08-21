from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import uuid
from typing import List

from models import (
    Alert, 
    CreateAlertRequest, 
    AlertResponse, 
    Score, 
    ScoreResponse, 
    HealthResponse,
    ScoreFactors
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

# In-memory storage for demo purposes
alerts_storage: List[Alert] = []
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
    return AlertResponse(
        alerts=alerts_storage,
        total=len(alerts_storage)
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
        asset_id=alert_request.asset_id,
        asset_symbol=f"SYMBOL_{alert_request.asset_id}",  # Stub asset symbol
        type=alert_request.type,
        target_value=alert_request.target_value,
        is_active=True,
        created_at=datetime.now().isoformat()
    )
    
    alerts_storage.append(new_alert)
    return new_alert


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