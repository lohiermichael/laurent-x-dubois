const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const contactController = require('../controllers/contactController');

// Form validation middleware
const validateContact = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage((_, { req }) => {
      return req.language === 'fr' ? 
        'Le nom est requis' : 
        'The name is required';
    }),
    
  body('email')
    .trim()
    .notEmpty()
    .withMessage((_, { req }) => {
      return req.language === 'fr' ? 
        'L\'email est requis' : 
        'The email is required';
    })
    .isEmail()
    .withMessage((_, { req }) => {
      return req.language === 'fr' ? 
        'Veuillez entrer un email valide' : 
        'Please enter a valid email';
    })
    .normalizeEmail(),
    
  body('message')
    .trim()
    .notEmpty()
    .withMessage((_, { req }) => {
      return req.language === 'fr' ? 
        'Le message est requis' : 
        'The message is required';
    })
];

// Routes
router.get('/', contactController.renderContactPage);
router.post('/', validateContact, contactController.handleContactForm);

module.exports = router;
