// Example service that calls a Watson ML endpoint using axios
const axios = require('axios');
const logger = require('../config/logger');


const mlPredict = async (payload) => {
const url = process.env.WATSON_ML_URL;
const apikey = process.env.WATSON_APIKEY;
if (!url || !apikey) throw new Error('Missing Watson ML config');


try {
const auth = { username: 'apikey', password: apikey };
const res = await axios.post(url, payload, { auth, timeout: 15000 });
return res.data;
} catch (err) {
logger.error('mlService error', err.message || err.toString());
throw err;
}
};


module.exports = { mlPredict };