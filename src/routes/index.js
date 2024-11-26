const express = require('express');
const router = express.Router();

const galleryRoutes = require('./galleryRoutes');
const contactRoutes = require('./contactRoutes');
const staticRoutes = require('./staticRoutes');
const pageRoutes = require('./pageRoutes');
const pageController = require('../controllers/pageController');

// Static routes (no language prefix needed)
router.use('/', staticRoutes);

// Main application routes
router.use('/', pageRoutes);
router.use('/', contactRoutes);
router.use('/', galleryRoutes);

// 404 handler should be last - catch any unmatched routes
router.use('*', pageController.render404Page);

module.exports = router;
