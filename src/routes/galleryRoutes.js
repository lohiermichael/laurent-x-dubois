const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

router.get('/__all__', galleryController.renderAllGalleries);
router.get('/:galleryName', galleryController.renderGallery);

module.exports = router;
