# test-vite-react-scaffolding

A full-stack application built with React + Node.js/Express + MongoDB + JWT Auth.

## Architecture

- **Frontend**: React with TypeScript
- **Backend**: node_express
- **Database**: mongodb
- **Authentication**: JWT
- **API Pattern**: REST

## Project Structure

```
test-vite-react-scaffolding/
├── frontend/          # React frontend application
├── backend/           # Backend API server
├── shared/              # Shared types and utilities
├── docker-compose.yml        # Local development environment
└── README.md                 # This file
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

- Docker and Docker Compose (for local development)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp backend/.env.example backend/.env
   ```

4. Start the development environment:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run test` - Run tests for both frontend and backend

## API Documentation

The API documentation is available at `http://localhost:3001/api/docs` when running in development mode.

## Deployment

This application can be deployed using Docker containers. See `docker-compose.yml` for the complete setup.

