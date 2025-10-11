const app = require('./app');
const connectDB = require('./db/mongoose');
const config = require('./config');
const logger = require('./utils/logger');

connectDB();

const server = app.listen(config.port, () => {
  logger.info(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
});

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = server;
