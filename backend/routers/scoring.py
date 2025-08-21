from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()


class ScoreRequest(BaseModel):
    """Model for score calculation requests"""
    symbols: List[str]
    criteria: List[str] = ["momentum", "volatility", "sentiment"]


class AssetScore(BaseModel):
    """Model for individual asset score"""
    symbol: str
    overall_score: float
    momentum_score: float
    volatility_score: float
    sentiment_score: float
    recommendation: str
    last_updated: datetime


class ScoreResponse(BaseModel):
    """Model for score responses"""
    scores: List[AssetScore]
    metadata: Dict[str, Any]


@router.post("/calculate", response_model=ScoreResponse)
async def calculate_scores(request: ScoreRequest):
    """Calculate scores for given symbols"""
    # Stub implementation - returns mock scores
    import random
    
    mock_scores = []
    for symbol in request.symbols:
        # Generate mock scores
        momentum = round(random.uniform(0.1, 1.0), 2)
        volatility = round(random.uniform(0.1, 1.0), 2)
        sentiment = round(random.uniform(0.1, 1.0), 2)
        overall = round((momentum + volatility + sentiment) / 3, 2)
        
        # Determine recommendation based on overall score
        if overall >= 0.8:
            recommendation = "strong_buy"
        elif overall >= 0.6:
            recommendation = "buy"
        elif overall >= 0.4:
            recommendation = "hold"
        else:
            recommendation = "sell"
        
        asset_score = AssetScore(
            symbol=symbol,
            overall_score=overall,
            momentum_score=momentum,
            volatility_score=volatility,
            sentiment_score=sentiment,
            recommendation=recommendation,
            last_updated=datetime.now()
        )
        mock_scores.append(asset_score)
    
    return ScoreResponse(
        scores=mock_scores,
        metadata={
            "calculation_time": datetime.now().isoformat(),
            "criteria_used": request.criteria,
            "total_symbols": len(request.symbols),
            "data_source": "mock_data",
            "version": "1.0.0"
        }
    )


@router.get("/symbols/{symbol}", response_model=AssetScore)
async def get_symbol_score(symbol: str):
    """Get score for a specific symbol"""
    # Stub implementation - returns mock score
    import random
    
    momentum = round(random.uniform(0.1, 1.0), 2)
    volatility = round(random.uniform(0.1, 1.0), 2)
    sentiment = round(random.uniform(0.1, 1.0), 2)
    overall = round((momentum + volatility + sentiment) / 3, 2)
    
    if overall >= 0.8:
        recommendation = "strong_buy"
    elif overall >= 0.6:
        recommendation = "buy"
    elif overall >= 0.4:
        recommendation = "hold"
    else:
        recommendation = "sell"
    
    return AssetScore(
        symbol=symbol.upper(),
        overall_score=overall,
        momentum_score=momentum,
        volatility_score=volatility,
        sentiment_score=sentiment,
        recommendation=recommendation,
        last_updated=datetime.now()
    )


@router.get("/top-performers", response_model=List[AssetScore])
async def get_top_performers(limit: int = 10):
    """Get top performing assets by score"""
    # Stub implementation - returns mock top performers
    top_symbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "NVDA", "META", "NFLX", "AMD", "CRM"]
    
    mock_performers = []
    for i, symbol in enumerate(top_symbols[:limit]):
        # Generate higher scores for top performers
        base_score = 0.7 + (i * 0.02)
        momentum = round(min(base_score + random.uniform(0, 0.2), 1.0), 2)
        volatility = round(min(base_score + random.uniform(0, 0.15), 1.0), 2)
        sentiment = round(min(base_score + random.uniform(0, 0.15), 1.0), 2)
        overall = round((momentum + volatility + sentiment) / 3, 2)
        
        asset_score = AssetScore(
            symbol=symbol,
            overall_score=overall,
            momentum_score=momentum,
            volatility_score=volatility,
            sentiment_score=sentiment,
            recommendation="buy" if overall >= 0.6 else "hold",
            last_updated=datetime.now()
        )
        mock_performers.append(asset_score)
    
    # Sort by overall score descending
    mock_performers.sort(key=lambda x: x.overall_score, reverse=True)
    return mock_performers


@router.get("/market-summary")
async def get_market_summary():
    """Get overall market scoring summary"""
    # Stub implementation - returns mock market summary
    return {
        "market_sentiment": "bullish",
        "average_score": 0.72,
        "total_analyzed": 500,
        "top_sector": "technology",
        "volatility_index": 0.35,
        "momentum_trend": "positive",
        "last_updated": datetime.now().isoformat(),
        "recommendations": {
            "strong_buy": 45,
            "buy": 125,
            "hold": 200,
            "sell": 130
        }
    }