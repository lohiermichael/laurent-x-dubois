const express = require('express');
const mainRoutes = express.Router();
const pageController = require('../controllers/pageController');

// Normal routes
mainRoutes.get('/', pageController.renderHomePage);

// Handle both English and French thanks pages
mainRoutes.get('/thanks', pageController.renderThanksPage);  // For English
mainRoutes.get('/merci', pageController.renderThanksPage);   // For French

// Create separate router for error handling
const errorRoute = pageController.render404Page;

module.exports = { mainRoutes, errorRoute };
