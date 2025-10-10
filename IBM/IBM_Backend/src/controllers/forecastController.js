const forecastService = require('../services/forecastService');

exports.createForecast = async (req, res, next) => {
  try {
    const { horizon_hours } = req.body;
    const forecast = await forecastService.generateForecast(horizon_hours);
    res.json({ success: true, data: forecast });
  } catch (err) {
    next(err);
  }
};

exports.getForecasts = async (req, res, next) => {
  try {
    const forecasts = await forecastService.getForecasts();
    res.json({ success: true, data: forecasts });
  } catch (err) {
    next(err);
  }
};