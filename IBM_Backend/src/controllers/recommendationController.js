const recommendationService = require('../services/recommendationService');

exports.createRecommendation = async (req, res, next) => {
  try {
    const { currentMetrics } = req.body;
    const rec = await recommendationService.generateRecommendations(currentMetrics);
    res.json({ success: true, data: rec });
  } catch (err) {
    next(err);
  }
};

exports.getRecommendations = async (req, res, next) => {
  try {
    const recs = await recommendationService.getRecommendations();
    res.json({ success: true, data: recs });
  } catch (err) {
    next(err);
  }
};