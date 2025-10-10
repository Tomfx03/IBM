const Joi = require('joi');


const metricsSchema = Joi.object({
timeframe_hours: Joi.number().integer().min(1).max(168).default(24),
});


module.exports = { metricsSchema };