exports.simulate = async (req, res, next) => {
  try {
    const { adjustments } = req.body;

    const baselineEnergy = 1000;
    const simulatedEnergy = baselineEnergy * (1 - (adjustments.efficiency || 0) / 100);
    const simulatedPUE = 1.6 - (adjustments.coolingImprovement || 0) * 0.05;

    res.json({
      success: true,
      data: { simulatedEnergy, simulatedPUE },
    });
  } catch (err) {
    next(err);
  }
};
