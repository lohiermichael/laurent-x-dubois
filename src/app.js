const express = require('express');
const configureExpress = require('./config/express');
const routes = require('./routes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// Configure express
configureExpress(app);

// Routes
app.use('/', routes);

// Error handling
app.use(errorMiddleware);

module.exports = { app };
