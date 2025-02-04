const { body } = require('express-validator');

/**
 * Middleware for validating contact form submissions
 * Includes validation rules for name, email and message fields
 */
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

module.exports = validateContact;
