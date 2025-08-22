from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel


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
    asset_id: str
    asset_symbol: str
    type: str  # AlertType
    target_value: float
    is_active: bool
    created_at: str
    triggered_at: Optional[str] = None


class CreateAlertRequest(BaseModel):
    asset_id: str
    type: str  # AlertType
    target_value: float


class UpdateAlertRequest(BaseModel):
    asset_id: Optional[str] = None
    type: Optional[str] = None  # AlertType
    target_value: Optional[float] = None
    is_active: Optional[bool] = None


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