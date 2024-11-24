const { validationResult } = require('express-validator');
const mailer = require('../config/mailer');

exports.renderContactPage = (req, res) => {
  res.render('contact', {
    alertMsgPerInput: new Map(),
    nameInput: '',
    emailInput: '',
    telephoneInput: '',
    websiteInput: '',
    messageInput: '',
    path: req.path,
    currentLang: req.language
  });
};

exports.handleContactForm = async (req, res) => {
  const errors = validationResult(req);
  const formData = {
    name: req.body.name,
    email: req.body.email,
    telephone: req.body.telephone || '',
    website: req.body.website || '',
    message: req.body.message
  };

  // If validation fails, re-render form with errors
  if (!errors.isEmpty()) {
    const alertMsgPerInput = new Map();
    errors.array().forEach(error => {
      alertMsgPerInput.set(error.path, error.msg);
    });

    return res.render('contact', {
      alertMsgPerInput,
      nameInput: formData.name,
      emailInput: formData.email,
      telephoneInput: formData.telephone,
      websiteInput: formData.website,
      messageInput: formData.message,
      path: req.path,
      currentLang: req.language
    });
  }

  try {
    // Attempt to send email
    await mailer.sendContactEmail(formData);
    
    // On success, redirect to thanks page
    return res.redirect(req.language === 'fr' ? '/merci' : '/en/thanks');
  } catch (error) {
    console.error('Failed to send email:', error);
    
    // On error, re-render form with server error message
    const alertMsgPerInput = new Map([
      ['server', req.language === 'fr' ? 
        'Erreur serveur :(' : 
        'Server error :(']
    ]);
    
    return res.status(500).render('contact', {
      alertMsgPerInput,
      nameInput: formData.name,
      emailInput: formData.email,
      telephoneInput: formData.telephone,
      websiteInput: formData.website,
      messageInput: formData.message,
      path: req.path,
      currentLang: req.language
    });
  }
};
