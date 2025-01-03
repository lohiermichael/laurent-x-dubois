const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const languageMiddleware = require('../middleware/languageMiddleware');
const seoMiddleware = require('../middleware/seoMiddleware');
const { GOOGLE_ANALYTICS_MEASUREMENT_ID } = require('./environment');
const { CLICKY_ANALYTICS_MEASUREMENT_ID } = require('./environment');

module.exports = (app) => {
  // View engine setup
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../views'));

  // Middleware
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use((req, res, next) => {
    res.locals.googleAnalyticsMeasurementId = GOOGLE_ANALYTICS_MEASUREMENT_ID;
    res.locals.clickyAnalyticsMeasurementId = CLICKY_ANALYTICS_MEASUREMENT_ID;
    next();
  });
  app.use(languageMiddleware);
  app.use(seoMiddleware);
};
