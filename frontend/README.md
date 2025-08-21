# Enhanced Stock Alert App - Frontend

This is the frontend application for the Enhanced Stock Alert App, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Landing Page**: Modern, responsive landing page showcasing app features
- **Dashboard**: Real-time portfolio overview with stock scores and performance metrics
- **Alert Center**: Comprehensive alert management with filtering and status tracking
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Mode Support**: Built-in dark/light theme switching
- **Type Safety**: Full TypeScript integration with shared type definitions

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: Modern React patterns
- **ESLint**: Code linting and formatting

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── dashboard/       # Dashboard page
│   ├── alerts/          # Alert center page
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Landing page
│   └── globals.css      # Global styles
└── components/          # Reusable React components (future)
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## Backend Integration

The frontend connects to the FastAPI backend running on port 8000. Make sure the backend is running for full functionality.

## Deployment

Build the app for production:

```bash
npm run build
npm start
```

The app can be deployed to Vercel, Netlify, or any platform supporting Next.js applications.

## Contributing

1. Follow the existing code style and TypeScript patterns
2. Use Tailwind CSS for styling
3. Ensure responsive design for all new components
4. Test on both light and dark themes
