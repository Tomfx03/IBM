const Forecast = require('../models/Forecast');

exports.generateForecast = async (horizon_hours) => {
  // Dummy forecast logic — replace with real ML/AI logic later
  const forecastData = Array.from({ length: horizon_hours }).map((_, i) => ({
    hour: i + 1,
    predictedEnergy: Math.random() * 100 + 500,
  }));

  const forecast = new Forecast({
    horizon_hours,
    forecastData,
    createdAt: new Date(),
  });

  return await forecast.save();
};

exports.getForecasts = async () => {
  return await Forecast.find().sort({ createdAt: -1 }).limit(20);
};