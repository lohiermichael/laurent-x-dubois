const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const validateContact = require('../middleware/validateContactMiddleware');

// French routes
router.get('/contact', contactController.renderContactPage);
router.post('/contact', validateContact, contactController.handleContactForm);

// English routes
router.get('/en/contact', contactController.renderContactPage);
router.post('/en/contact', validateContact, contactController.handleContactForm);

module.exports = router;
