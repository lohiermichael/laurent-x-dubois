const mailerService = require('../services/mailerService');
const { validationResult } = require('express-validator');

exports.renderContactPage = (req, res) => {
  res.render('contact', {
    path: req.path,
    currentLang: req.language,
    alertMsgPerInput: new Map(),
    nameInput: '',
    emailInput: '',
    telephoneInput: '',
    websiteInput: '',
    messageInput: ''
  });
};

exports.handleContactForm = async (req, res) => {
  const errors = validationResult(req);
  const formData = req.body;

  if (!errors.isEmpty()) {
    const alertMsgPerInput = new Map();
    errors.array().forEach(error => {
      alertMsgPerInput.set(error.path, error.msg);
    });

    return res.render('contact', {
      path: req.path,
      currentLang: req.language,
      alertMsgPerInput,
      nameInput: formData.name || '',
      emailInput: formData.email || '',
      telephoneInput: formData.telephone || '',
      websiteInput: formData.website || '',
      messageInput: formData.message || ''
    });
  }

  try {
    await mailerService.sendContactEmail(formData);
    res.redirect('/thanks');
  } catch (error) {
    console.error('Email sending error:', error);
    res.render('contact', {
      path: req.path,
      currentLang: req.language,
      alertMsgPerInput: new Map([['server', 'Server error occurred']]),
      ...formData
    });
  }
};
