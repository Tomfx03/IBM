const mongoose = require('mongoose');

const PDUSchema = new mongoose.Schema({
  name: String,
  location: String,
  readings: [{ timestamp: Date, power_kw: Number, current_a: Number, voltage_v: Number }]
});

// Prevent OverwriteModelError
module.exports = mongoose.models.PDU || mongoose.model('PDU', PDUSchema);
