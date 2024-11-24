const seoService = require('../services/seoService');

module.exports = (req, res, next) => {
  const metadata = seoService.getMetadataForPath(req.path);
  
  res.locals.pageTitle = metadata.title;
  res.locals.pageDescription = metadata.description;
  res.locals.seoUtils = seoService;
  
  next();
};
