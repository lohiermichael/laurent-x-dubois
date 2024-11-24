const { translations, getTranslation } = require('../utils/translations');
const { getLanguageUrls } = require('../utils/urlMapping');
const { getPageUrl } = require('../utils/urlHelper');

module.exports = (req, res, next) => {
  // Determine language from URL
  const language = req.path.startsWith('/en') ? 'en' : 'fr';
  req.language = language;
  
  // Get URLs for both languages
  const languageUrls = getLanguageUrls(req.path);
  
  // Add translation helper and language data to response locals
  res.locals.t = (key) => getTranslation(translations[language], key);
  res.locals.currentLang = language;
  res.locals.languageUrls = languageUrls;
  
  // Add URL helper to locals
  res.locals.getPageUrl = (page) => getPageUrl(page, language);
  
  next();
};
