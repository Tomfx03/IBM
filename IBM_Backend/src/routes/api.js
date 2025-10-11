const express = require('express');
const router = express.Router();

// Controllers
const forecastController = require('../controllers/forecastController');
const metricsController = require('../controllers/metricsController');
const recommendationController = require('../controllers/recommendationController');
const reportController = require('../controllers/reportsController');
const simulationController = require('../controllers/simulateController');

// Forecast routes
router.post('/forecast', forecastController.createForecast);
router.get('/forecast', forecastController.getForecasts);

// Metrics routes
router.get('/metrics', metricsController.getMetrics);

// Recommendation routes
router.post('/recommendation', recommendationController.createRecommendation);
router.get('/recommendation', recommendationController.getRecommendations);

// Report routes
router.get('/reports', reportController.getReports);

// Simulation routes
router.post('/simulate', simulationController.simulate);

module.exports = router;