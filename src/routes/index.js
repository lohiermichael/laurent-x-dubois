const express = require('express');
const router = express.Router();

const galleryRoutes = require('./galleryRoutes');
const contactRoutes = require('./contactRoutes');

// Split the pageRoutes into normal routes and error route
const { mainRoutes, errorRoute } = require('./pageRoutes');

// Register all routes in correct order
router.use('/', mainRoutes);
router.use('/', galleryRoutes);
router.use('/contact', contactRoutes);

// Error route should be last
router.use('*', errorRoute);

module.exports = router;
