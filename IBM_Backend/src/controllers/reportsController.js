const Forecast = require('../models/Forecast');
const Recommendation = require('../models/Recommendation');

exports.getReports = async (req, res, next) => {
  try {
    const forecasts = await Forecast.find().sort({ createdAt: -1 }).limit(10);
    const recommendations = await Recommendation.find().sort({ createdAt: -1 }).limit(10);

    res.json({
      success: true,
      data: { forecasts, recommendations },
    });
  } catch (err) {
    next(err);
  }
};
