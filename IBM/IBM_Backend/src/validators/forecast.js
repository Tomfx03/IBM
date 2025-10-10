const Joi = require('joi');


const forecastSchema = Joi.object({
horizon_hours: Joi.number().integer().min(1).max(168).default(24),
});


module.exports = { forecastSchema };