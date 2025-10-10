# Sustainable Cloud Computing Backend - Usage Guide

## Overview

This is a production-ready Node.js backend for an AI-powered Sustainable Cloud Computing Dashboard. It provides REST APIs for ingesting time-series logs, generating energy forecasts, creating optimization recommendations, running simulations, and generating sustainability reports.

## Architecture

```
src/
├── config/           # Configuration and database connection
├── models/           # Mongoose schemas (ServerLog, PDU, Chiller, Forecast, Recommendation)
├── controllers/      # Request handlers
├── routes/           # Express route definitions
├── middleware/       # Auth, validation, error handling
├── services/         # Business logic (ML service, optimizer)
├── validators/       # Joi validation schemas
└── utils/            # Logger, JWT utilities

tests/
├── unit/            # Unit tests
└── integration/     # API integration tests
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your settings:
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `WATSON_ML_API_KEY`: Watson ML API key (optional)

### 3. Run with Docker Compose (Recommended)

```bash
docker-compose up
```

This starts:
- Node.js app on port 3000
- MongoDB on port 27017

### 4. Run Locally

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

All endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Generate a token programmatically:

```javascript
const { generateToken } = require('./src/utils/jwt');
const token = generateToken({ userId: 'user123', role: 'admin' });
```

### Metrics API

#### Get Current Metrics
```bash
GET /api/metrics/current
```

Returns real-time datacenter metrics (PUE, power consumption, server utilization).

#### Get Historical Metrics
```bash
GET /api/metrics/historical?startDate=2025-01-01&endDate=2025-01-31&granularity=1h
```

#### Ingest Logs
```bash
POST /api/metrics/ingest
Content-Type: application/json

{
  "type": "server",
  "data": [
    {
      "serverId": "server-001",
      "cpuUsage": 45.5,
      "memoryUsage": 60.2,
      "powerConsumption": 250,
      "temperature": 24.5,
      "status": "active"
    }
  ]
}
```

Supported types: `server`, `pdu`, `chiller`

### Forecast API

#### Generate Forecast
```bash
POST /api/forecast/generate
Content-Type: application/json

{
  "forecastType": "energy",
  "horizon": "24hours"
}
```

Options:
- `forecastType`: `energy`, `pue`, `temperature`, `load`
- `horizon`: `1hour`, `6hours`, `24hours`, `7days`, `30days`

#### Get Latest Forecast
```bash
GET /api/forecast/latest?type=energy
```

#### Get Forecast History
```bash
GET /api/forecast/history?type=energy&limit=10
```

### Recommendations API

#### Generate Recommendations
```bash
POST /api/recommendations/generate
```

Analyzes current metrics and generates optimization recommendations.

#### Get Recommendations
```bash
GET /api/recommendations?status=pending&priority=high&category=energy
```

#### Update Recommendation Status
```bash
PATCH /api/recommendations/:id
Content-Type: application/json

{
  "status": "completed"
}
```

Status options: `pending`, `in-progress`, `completed`, `dismissed`

#### Delete Recommendation
```bash
DELETE /api/recommendations/:id
```

### Simulate API

#### Run Simulation
```bash
POST /api/simulate
Content-Type: application/json

{
  "scenarioType": "workload-consolidation",
  "parameters": {
    "targetUtilization": 70,
    "serverCount": 100
  }
}
```

Scenario types:
- `workload-consolidation`: Optimize server utilization
- `cooling-optimization`: Adjust cooling setpoints
- `server-upgrade`: Compare efficiency of new hardware
- `renewable-energy`: Simulate solar/battery integration

#### Compare Scenarios
```bash
POST /api/simulate/compare
Content-Type: application/json

{
  "scenarios": [
    {
      "name": "Scenario 1",
      "type": "workload-consolidation",
      "parameters": { "targetUtilization": 70 }
    },
    {
      "name": "Scenario 2",
      "type": "cooling-optimization",
      "parameters": { "supplyTempIncrease": 2 }
    }
  ]
}
```

### Reports API

#### Generate Sustainability Report
```bash
GET /api/reports/sustainability?startDate=2025-01-01&endDate=2025-01-31
```

Returns comprehensive sustainability metrics, carbon footprint, and optimization impact.

#### Generate Performance Report
```bash
GET /api/reports/performance?startDate=2025-01-01&endDate=2025-01-31
```

Returns server performance analysis and top power consumers.

#### Export Report
```bash
GET /api/reports/export?reportType=sustainability&format=json
```

Formats: `json`, `csv`

## Testing

### Run All Tests
```bash
npm test
```

### Run Unit Tests Only
```bash
npm run test -- tests/unit
```

### Run Integration Tests Only
```bash
npm run test:integration
```

### Watch Mode
```bash
npm run test:watch
```

## ML Service Integration

The backend integrates with Watson ML for forecasting. If the ML service is unavailable, it falls back to statistical models.

### Watson ML Configuration

1. Set environment variables:
```bash
WATSON_ML_API_URL=https://your-watson-endpoint.com/v1/predictions
WATSON_ML_API_KEY=your-api-key
WATSON_ML_MODEL_ID=your-model-id
```

2. The ML service automatically handles:
   - API authentication
   - Timeout management
   - Fallback to rule-based forecasting

## Rule-Based Optimizer

The optimizer service generates recommendations based on predefined rules:

- **Low CPU utilization** (<30%): Suggests workload consolidation
- **High PUE** (>1.8): Recommends cooling optimization
- **High chiller temperature**: Suggests setpoint adjustment
- **Low power factor** (<0.9): Recommends power factor correction

## Production Deployment

### Docker Deployment

1. Build image:
```bash
docker build -t sustainable-cloud-backend .
```

2. Run container:
```bash
docker run -d \
  -p 3000:3000 \
  -e MONGODB_URI=mongodb://mongo:27017/sustainable-cloud \
  -e JWT_SECRET=your-production-secret \
  sustainable-cloud-backend
```

### Environment Variables for Production

```bash
NODE_ENV=production
JWT_SECRET=<strong-random-secret>
MONGODB_URI=<production-mongodb-uri>
WATSON_ML_API_KEY=<production-api-key>
CORS_ORIGIN=https://your-frontend-domain.com
LOG_LEVEL=warn
```

## Monitoring & Logging

Logs are written to:
- `logs/combined.log`: All logs
- `logs/error.log`: Error logs only

Log format is JSON in production, pretty-printed in development.

### Health Check

```bash
GET /health
```

Returns server health status and uptime.

## CI/CD

The project includes GitHub Actions workflow (`.github/workflows/ci.yml`) that:
- Runs tests on Node.js 18.x and 20.x
- Performs security audits
- Builds Docker image
- Uploads coverage reports

## Security

- JWT authentication on all API endpoints
- Rate limiting (100 requests per 15 minutes)
- Helmet.js for security headers
- Input validation with Joi
- MongoDB injection protection via Mongoose

## Common Issues

### MongoDB Connection Error

Ensure MongoDB is running:
```bash
docker-compose up mongo
```

### JWT Token Expired

Generate a new token or configure longer expiration:
```bash
JWT_EXPIRE=30d
```

### Watson ML Timeout

Increase timeout in `src/config/index.js`:
```javascript
timeout: 60000  // 60 seconds
```

## Support

For issues or questions, check:
1. Application logs in `logs/` directory
2. MongoDB connection status
3. Environment variable configuration

## License

MIT
