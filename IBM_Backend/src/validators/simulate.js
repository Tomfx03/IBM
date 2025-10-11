const Joi = require('joi');


const simulateSchema = Joi.object({
adjustments: Joi.object().default({}),
horizon_hours: Joi.number().integer().min(1).max(168).default(24)
});


module.exports = { simulateSchema };