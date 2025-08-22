from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


class Asset(BaseModel):
    id: str
    symbol: str
    name: str
    current_price: float
    last_updated: str


class AlertType(str):
    PRICE_ABOVE = "price_above"
    PRICE_BELOW = "price_below"
    PERCENTAGE_CHANGE = "percentage_change"


class Alert(BaseModel):
    id: str
    assetId: str
    assetSymbol: str
    type: str  # AlertType
    targetValue: float
    isActive: bool
    createdAt: str
    triggeredAt: Optional[str] = None

    class Config:
        # Accept both camelCase and snake_case for input
        populate_by_name = True


class CreateAlertRequest(BaseModel):
    assetId: str
    type: str  # AlertType
    targetValue: float


class UpdateAlertRequest(BaseModel):
    assetId: Optional[str] = None
    type: Optional[str] = None  # AlertType
    targetValue: Optional[float] = None
    isActive: Optional[bool] = None


class AlertResponse(BaseModel):
    alerts: List[Alert]
    total: int


class ScoreFactors(BaseModel):
    volatility: float
    momentum: float
    volume: float


class Score(BaseModel):
    id: str
    asset_id: str
    asset_symbol: str
    score: float
    factors: ScoreFactors
    calculated_at: str


class ScoreResponse(BaseModel):
    scores: List[Score]
    total: int


class HealthResponse(BaseModel):
    status: str
    timestamp: str
    version: str