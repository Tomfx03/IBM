const mongoose = require('mongoose');

const ChillerSchema = new mongoose.Schema({
  name: String,
  location: String,
  readings: [{ timestamp: Date, load_ton: Number, power_kw: Number, temp_c: Number }]
});

module.exports = mongoose.model('Chiller', ChillerSchema);