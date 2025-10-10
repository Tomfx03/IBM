const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const { connectDB } = require('./db/mongoose');
const apiRoutes = require('./routes/api');
const { errorHandler } = require('./middleware/errorHandler');
const logger = require('./config/logger');


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));


app.use('/api', apiRoutes);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;


connectDB()
.then(() => {
app.listen(PORT, () => {
logger.info(`Server running on port ${PORT}`);
});
})
.catch((err) => {
logger.error('Failed to start app', err);
process.exit(1);
});


module.exports = app; // for tests