const mongoose = require('mongoose');

const ForecastSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  horizon_hours: Number,
  predicted: [{ timestamp: Date, pue: Number, energy_kwh: Number }],
  meta: mongoose.Schema.Types.Mixed
});

// Check if the model already exists before creating
module.exports = mongoose.models.Forecast || mongoose.model('Forecast', ForecastSchema);

