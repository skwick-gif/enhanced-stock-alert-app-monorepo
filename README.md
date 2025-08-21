# Enhanced Stock Alert App

A comprehensive stock monitoring and alert system built with FastAPI backend, Next.js 14 frontend, and shared TypeScript types.

## Architecture

This monorepo contains:
- **Backend**: FastAPI (Python) REST API
- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Shared**: TypeScript type definitions

## Features

### Backend (FastAPI)
- ✅ Health check endpoint (`/health`)
- ✅ Alert management (`GET/POST /alerts`)
- ✅ Scoring system (`GET /score`)
- ✅ Pydantic models for data validation
- ✅ CORS enabled for frontend integration
- ✅ Docker containerization

### Frontend (Next.js 14)
- ✅ Dashboard with overview statistics
- ✅ Alert Center for managing alerts
- ✅ Responsive UI with Tailwind CSS
- ✅ TypeScript integration
- ✅ Reusable AlertList component
- ✅ Backend API integration with fallback to demo data
- ✅ Docker containerization

### Shared Types
- ✅ TypeScript interfaces for Alert, Asset, Score
- ✅ Request/Response types
- ✅ Cross-platform type safety

## Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

### Docker

#### Backend
```bash
cd backend
docker build -t stock-alert-backend .
docker run -p 8000:8000 stock-alert-backend
```

#### Frontend
```bash
cd frontend
docker build -t stock-alert-frontend .
docker run -p 3000:3000 stock-alert-frontend
```

## API Endpoints

- `GET /health` - Health check
- `GET /alerts` - List all alerts
- `POST /alerts` - Create new alert
- `GET /score` - Get asset scores

## Screenshots

### Homepage
![Homepage](https://github.com/user-attachments/assets/b0f6db65-da97-4c95-ae21-3301fbf3d920)

### Dashboard
![Dashboard](https://github.com/user-attachments/assets/88d3e0f2-ef0f-42bb-9374-a88946f977ce)

### Alert Center
![Alert Center](https://github.com/user-attachments/assets/6ad6a49c-5d77-496b-a7f6-147f41746b8c)

## Development

This is a stub implementation focusing on:
- API connectivity and data flow
- Basic CRUD operations for alerts
- UI components and navigation
- Type safety across the stack

Future enhancements will include:
- Real-time stock data integration
- Persistent data storage
- User authentication
- Real-time notifications
- Advanced scoring algorithms
