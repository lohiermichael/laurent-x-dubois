const express = require('express');
const router = express.Router();

const galleryRoutes = require('./galleryRoutes');
const contactRoutes = require('./contactRoutes');
const staticRoutes = require('./staticRoutes');
const { mainRoutes, errorRoute } = require('./pageRoutes');

// Static routes (no language prefix)
router.use('/', staticRoutes);

// English routes - needs to be before French routes to properly handle /en prefix
router.use('/en', mainRoutes);
router.use('/en/contact', contactRoutes);
router.use('/en', galleryRoutes);

// French routes (default)
router.use('/', mainRoutes);
router.use('/contactez-nous', contactRoutes);
router.use('/', galleryRoutes);

// Error route should be last
router.use('*', errorRoute);

module.exports = router;
