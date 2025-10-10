require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/sustainable_cloud',
  jwtSecret: process.env.JWT_SECRET || 'supersecretjwt',
  watsonML: {
    url: process.env.WATSON_ML_URL || '',
    apiKey: process.env.WATSON_APIKEY || '',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  },
};
