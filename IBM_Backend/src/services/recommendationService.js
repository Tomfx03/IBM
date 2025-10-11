const Recommendation = require('../models/Recommendation');

exports.generateRecommendations = async (currentMetrics) => {
  // Simple rule-based logic — replace with AI/optimizer later
  const rules = [];

  if (currentMetrics.cpuUsage > 80) rules.push('Reduce server load');
  if (currentMetrics.chillerLoad > 75) rules.push('Increase cooling efficiency');
  if (currentMetrics.energy > 800) rules.push('Optimize energy usage');

  const rec = new Recommendation({
    inputMetrics: currentMetrics,
    rules,
    createdAt: new Date(),
  });

  return await rec.save();
};

exports.getRecommendations = async () => {
  return await Recommendation.find().sort().limit(20);
};