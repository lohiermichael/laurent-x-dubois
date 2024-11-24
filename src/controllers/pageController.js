const galleryService = require('../services/galleryService');

exports.renderHomePage = async (req, res) => {
  try {
    const galleryData = await galleryService.getGalleryData('default');
    res.render('gallery', {
      ...galleryData,
      path: req.path,
      currentLang: req.language
    });
  } catch (error) {
    console.error('Error rendering home page:', error);
    res.status(500).render('404', {
      path: req.path,
      currentLang: req.language
    });
  }
};

exports.renderThanksPage = (req, res) => {
  res.render('thanks', {
    path: req.path,
    currentLang: req.language
  });
};

exports.render404Page = (req, res) => {
  res.status(404).render('404', {
    path: req.path,
    currentLang: req.language
  });
};
