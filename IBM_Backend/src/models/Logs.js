const mongoose = require('mongoose');


const LogSchema = new mongoose.Schema({
source: { type: String, enum: ['server','pdu','chiller','sensor'], required: true },
timestamp: { type: Date, required: true, index: true },
metrics: { type: mongoose.Schema.Types.Mixed, required: true },
meta: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });


module.exports = mongoose.model('Logs', LogSchema);