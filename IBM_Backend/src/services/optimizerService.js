// Rule-based fallback optimizer
// Accepts current metrics and forecast and returns recommendations


const Recommendation = require('../models/Recommendation');


const generateRules = ({ metricsSnapshot, forecast }) => {
const recs = [];


// Rule 1: High PUE forecast
const maxPUE = Math.max(...(forecast.predicted.map(p => p.pue || 0)));
if (maxPUE > 1.6) {
recs.push({
title: 'Reduce non-critical load',
description: 'Shift non-critical batch jobs to off-peak hours or scale down non-essential servers.',
severity: 'high',
target: 'server',
meta: { maxPUE }
});
}


// Rule 2: High PDU power
const highPdus = (metricsSnapshot.pdus || []).filter(p => p.power_kw && p.power_kw > 50);
if (highPdus.length) {
recs.push({
title: 'Inspect PDUs with high load',
description: `PDUs ${highPdus.map(p=>p.name||p.id).join(', ')} report >50kW — consider balancing load or redistributing.`,
severity: 'medium',
target: 'pdu',
meta: { highPdus }
});
}


// Rule 3: Chiller inefficiency
const chillers = metricsSnapshot.chillers || [];
const inefficient = chillers.filter(c => c.power_kw && c.load_ton && (c.power_kw / c.load_ton) > 0.8);
if (inefficient.length) {
recs.push({
title: 'Chiller efficiency check',
description: 'Some chillers show high power per ton — schedule maintenance or inspect setpoints.',
severity: 'medium',
target: 'chiller',
meta: { inefficient }
});
}


return recs;
};


const generateAndSave = async (ctx) => {
const recs = generateRules(ctx);
const docs = recs.map(r => new Recommendation(r));
await Recommendation.insertMany(docs);
return docs;
};


module.exports = { generateRules, generateAndSave };