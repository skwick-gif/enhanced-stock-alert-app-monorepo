# Real-Time Stock & Options Screener App

A personalized, real-time scanning and alerting tool for stocks and options, built as a monorepo with FastAPI backend, Next.js frontend, and shared TypeScript types, based on the Product Requirements Document (PRD).

## Architecture
- **Backend**: FastAPI (Python) for APIs, real-time screening, alerts, and AI integrations.
- **Frontend**: Next.js 14 with Tailwind CSS for responsive dashboard and UI.
- **Shared**: TypeScript types for cross-stack type safety.
- **Tooling**: Turborepo for monorepo management, with npm scripts for build and dev workflows.

## Features (Based on PRD)
- Real-time stock and options screening with filters for fundamentals, technicals, options flow, and sentiment.
- Custom alerts for buy, sell, stop-loss, and take-profit, delivered via app notifications or email.
- AI enhancements: natural language queries, adaptive filters, explainable alerts.
- Tracking and learning: alert history, performance insights, and AI-driven parameter suggestions.
- Dashboard with visualizations (e.g., heatmaps, bubble charts) and watchlist management.
- Notifications for upcoming reports (e.g., earnings).
- Tracking of news/social media for Fed speeches with AI market movement predictions.

## Getting Started
### Prerequisites
- Node.js (v18+), Python (3.10+), and PostgreSQL (v16+) installed.
- API keys for:
  - Polygon.io (real-time stocks/options data)
  - Alpha Vantage (fundamentals/technicals)
  - Finnhub (sentiment analysis)
  - OpenAI (NLP for natural language queries)
- Store API keys in `.env` files in `packages/backend`.

### Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/skwick-gif/enhanced-stock-alert-app-monorepo.git
   cd enhanced-stock-alert-app-monorepo