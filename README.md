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
- ✅ Alert management (`GET/POST/PUT/DELETE /alerts`)
- ✅ Individual alert retrieval (`GET /alerts/{id}`)
- ✅ File-based persistence (`alerts.json`)
- ✅ Scoring system (`GET /score`)
- ✅ Pydantic models for data validation
- ✅ CORS enabled for frontend integration
- ✅ Docker containerization

### Frontend (Next.js 14)
- ✅ Dashboard with overview statistics
- ✅ Alert Center for managing alerts
- ✅ Full CRUD operations for alerts (Create, Read, Update, Delete)
- ✅ Edit alert functionality with form validation
- ✅ Delete confirmation modal
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
- `GET /alerts/{id}` - Get specific alert by ID
- `PUT /alerts/{id}` - Update existing alert
- `DELETE /alerts/{id}` - Delete alert by ID
- `GET /score` - Get asset scores

### Alert Endpoints Details

#### Create Alert
```bash
POST /alerts
Content-Type: application/json

{
  "assetId": "AAPL",
  "type": "price_above|price_below|percentage_change",
  "targetValue": 150.0
}
```

#### Update Alert
```bash
PUT /alerts/{id}
Content-Type: application/json

{
  "assetId": "AAPL",          // optional
  "type": "price_above",      // optional  
  "targetValue": 160.0,       // optional
  "isActive": false           // optional
}
```

#### Delete Alert
```bash
DELETE /alerts/{id}
```

All alert operations support file-based persistence using `alerts.json`.

## Screenshots

### Homepage
![Homepage](https://github.com/user-attachments/assets/b0f6db65-da97-4c95-ae21-3301fbf3d920)

### Dashboard
![Dashboard](https://github.com/user-attachments/assets/88d3e0f2-ef0f-42bb-9374-a88946f977ce)

### Alert Center
![Alert Center](https://github.com/user-attachments/assets/6ad6a49c-5d77-496b-a7f6-147f41746b8c)

## Development

This implementation includes:
- ✅ Complete CRUD operations for alerts
- ✅ File-based persistence using `alerts.json`
- ✅ API connectivity and data flow
- ✅ UI components and navigation
- ✅ Type safety across the stack
- ✅ Form validation and error handling
- ✅ Delete confirmation modals

Future enhancements will include:
- Real-time stock data integration
- User authentication
- Real-time notifications
- Advanced scoring algorithms
- Database integration (PostgreSQL/MongoDB)
