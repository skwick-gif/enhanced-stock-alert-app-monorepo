from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn

from routers import alerts, scoring


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    print("🚀 Enhanced Stock Alert App Backend Starting...")
    yield
    # Shutdown logic
    print("🛑 Enhanced Stock Alert App Backend Shutting down...")


app = FastAPI(
    title="Enhanced Stock Alert App API",
    description="FastAPI backend for Enhanced Stock Alert Application",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(alerts.router, prefix="/api/alerts", tags=["alerts"])
app.include_router(scoring.router, prefix="/api/scoring", tags=["scoring"])


@app.get("/health", tags=["health"])
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "message": "Enhanced Stock Alert App Backend is running",
        "version": "1.0.0"
    }


@app.get("/", tags=["root"])
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Enhanced Stock Alert App API",
        "docs": "/docs",
        "health": "/health"
    }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )