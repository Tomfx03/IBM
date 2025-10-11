const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
  title: String,
  description: String,
  severity: { type: String, enum: ['low', 'medium', 'high'] },
  target: String,
  potentialSavings: String,
  inputMetrics: mongoose.Schema.Types.Mixed,
  rules: [mongoose.Schema.Types.Mixed],
  createdAt: { type: Date, default: Date.now }
});

// Prevent OverwriteModelError
module.exports = mongoose.models.Recommendation || mongoose.model('Recommendation', RecommendationSchema);
