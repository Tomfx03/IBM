const Log = require('../models/Logs');
const Pdu = require('../models/pdu');
const Chiller = require('../models/Chiller');

exports.getCurrentMetrics = async () => {
  const [latestLog, latestPdu, latestChiller] = await Promise.all([
    Log.findOne().sort({ timestamp: -1 }),
    Pdu.findOne().sort({ timestamp: -1 }),
    Chiller.findOne().sort({ timestamp: -1 }),
  ]);

  const cpuUsage = latestLog?.cpuUsage || 0;
  const energy = latestPdu?.energyConsumed || 0;
  const chillerLoad = latestChiller?.load || 0;
  const pue = cpuUsage > 0 ? (energy / cpuUsage).toFixed(2) : '0.00';

  return { cpuUsage, energy, chillerLoad, pue };
};