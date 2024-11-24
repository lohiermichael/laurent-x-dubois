const { translations, getTranslation } = require('../utils/translations');

module.exports = (req, res, next) => {
  // Determine language from URL
  const language = req.path.startsWith('/en') ? 'en' : 'fr';
  req.language = language;
  
  // Add translation helper to response locals
  res.locals.t = (key) => getTranslation(translations[language], key);
  res.locals.currentLang = language;
  
  next();
};
