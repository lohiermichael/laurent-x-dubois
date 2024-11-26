const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// Gallery list route - both languages
router.get('/galleries/__all__', galleryController.renderAllGalleries);
router.get('/en/galleries/__all__', galleryController.renderAllGalleries);

// Dynamic gallery routes - keep at the end to not interfere with other routes
router.get('/en/:galleryName', galleryController.renderGallery);
router.get('/:galleryName', galleryController.renderGallery);

module.exports = router;
