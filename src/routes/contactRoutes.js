const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const contactController = require('../controllers/contactController');

const validateContact = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
  body('message').notEmpty().withMessage('Message is required')
];

router.get('/', contactController.renderContactPage);
router.post('/', validateContact, contactController.handleContactForm);

module.exports = router;
