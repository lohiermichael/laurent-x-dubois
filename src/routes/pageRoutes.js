const express = require('express');
const mainRoutes = express.Router();
const pageController = require('../controllers/pageController');

// Normal routes
mainRoutes.get('/', pageController.renderHomePage);
mainRoutes.get('/thanks', pageController.renderThanksPage);

// Create separate router for error handling
const errorRoute = pageController.render404Page;

module.exports = { mainRoutes, errorRoute };
