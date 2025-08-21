# Enhanced Stock Alert App

A comprehensive stock monitoring and alert system built with modern web technologies. This monorepo contains both the FastAPI backend and Next.js frontend for an intelligent stock alert application with advanced scoring algorithms.

## 🚀 Features

- **Smart Stock Alerts**: Set intelligent price, volume, and technical indicator alerts
- **Advanced Scoring**: Comprehensive stock scoring based on momentum, volatility, and sentiment
- **Real-time Dashboard**: Monitor portfolio performance with live updates
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Type-safe API**: Full TypeScript integration between frontend and backend
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS

## 🏗️ Architecture

This is a monorepo containing:

- **Backend**: FastAPI application with Python
- **Frontend**: Next.js 14 application with TypeScript and Tailwind CSS  
- **Shared**: Common TypeScript type definitions
- **CI/CD**: GitHub Actions workflows for automated testing and deployment
- **Docker**: Containerization for both backend and frontend

## 📁 Project Structure

```
enhanced-stock-alert-app-monorepo/
├── backend/                 # FastAPI backend
│   ├── main.py             # FastAPI application entry point
│   ├── routers/            # API route handlers
│   │   ├── alerts.py       # Alert management endpoints
│   │   └── scoring.py      # Stock scoring endpoints
│   └── requirements.txt    # Python dependencies
├── frontend/               # Next.js frontend
│   ├── src/app/           # Next.js App Router pages
│   │   ├── dashboard/     # Portfolio dashboard
│   │   ├── alerts/        # Alert management
│   │   └── page.tsx       # Landing page
│   └── package.json       # Node.js dependencies
├── shared/                # Shared TypeScript types
│   └── types/             # Type definitions
│       ├── alerts.ts      # Alert-related types
│       ├── scoring.ts     # Scoring-related types
│       ├── assets.ts      # Asset-related types
│       └── index.ts       # Main exports
├── .github/workflows/     # CI/CD pipelines
└── README.md             # This file
```

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **Uvicorn**: ASGI server
- **Pydantic**: Data validation and serialization
- **Python 3.12+**: Latest Python features

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: Modern React patterns

### DevOps
- **GitHub Actions**: CI/CD automation
- **Docker**: Containerization
- **ESLint**: Code linting
- **Git**: Version control

## 🚀 Quick Start

### Prerequisites
- Python 3.12 or later
- Node.js 18.17 or later
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the FastAPI server:
```bash
python main.py
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📊 API Endpoints

### Health Check
- `GET /health` - Backend health status

### Alerts
- `GET /api/alerts` - List all alerts
- `POST /api/alerts` - Create new alert
- `GET /api/alerts/{id}` - Get specific alert
- `DELETE /api/alerts/{id}` - Delete alert

### Scoring
- `POST /api/scoring/calculate` - Calculate scores for symbols
- `GET /api/scoring/symbols/{symbol}` - Get score for specific symbol
- `GET /api/scoring/top-performers` - Get top performing stocks
- `GET /api/scoring/market-summary` - Get market overview

## 🧪 Testing

### Backend Tests
```bash
cd backend
python -m pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Using Docker

Build and run the backend:
```bash
cd backend
docker build -t stock-alert-backend .
docker run -p 8000:8000 stock-alert-backend
```

Build and run the frontend:
```bash
cd frontend
docker build -t stock-alert-frontend .
docker run -p 3000:3000 stock-alert-frontend
```

### Manual Deployment

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Start production servers:
```bash
# Backend
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000

# Frontend
cd frontend
npm start
```

## 🔧 Environment Variables

### Backend
Create a `.env` file in the backend directory:
```env
DEBUG=True
API_KEY=your_api_key_here
DATABASE_URL=your_database_url
```

### Frontend
Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ using FastAPI, Next.js, and modern web technologies.
