const metricsService = require('../services/metricsService');

exports.getMetrics = async (req, res, next) => {
  try {
    const metrics = await metricsService.getCurrentMetrics();
    res.json({ success: true, data: metrics });
  } catch (err) {
    next(err);
  }
};