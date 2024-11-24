const galleryService = require('../services/galleryService');
const fs = require('fs').promises;
const path = require('path');
const { getGalleryFolder } = require('../utils/urlMapping');

exports.renderGallery = async (req, res, next) => {
  try {
    const language = req.language;
    let galleryName = getGalleryFolder(req.params.galleryName, language) || '';
    const galleryPath = path.join(process.cwd(), 'public', 'galleries', galleryName);
    
    try {
      await fs.access(galleryPath);
      const galleryData = await galleryService.getGalleryData(galleryName);
      res.render('gallery', {
        ...galleryData,
        path: req.path,
        currentLang: req.language
      });
    } catch {
      // If folder doesn't exist, go to next route (which will be 404)
      next();
    }
  } catch (error) {
    console.error('Error rendering gallery:', error);
    next(error);
  }
};

exports.renderAllGalleries = async (req, res, next) => {
  try {
    const galleries = await galleryService.getAllGalleries();
    
    res.render('all-galleries', {
      galleries,
      path: req.path,
      currentLang: req.language
    });
  } catch (error) {
    console.error('Error rendering all galleries:', error);
    next(error);
  }
};
