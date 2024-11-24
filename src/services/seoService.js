const {
  pageMetadata,
  generateGalleryMetadata,
  generateAltFromFilename,
  enrichAltFromGalleryContext
} = require('../utils/seo');

class SeoService {
  getMetadataForPath(path) {
    // Remove language prefix if present
    const cleanPath = path.replace(/^\/[a-z]{2}/, '');
    
    // Remove leading slash and get first segment
    const segment = cleanPath.split('/')[1] || 'home';

    if (segment in pageMetadata) {
      return pageMetadata[segment];
    }

    // If it's a gallery path
    if (path !== '/galleries') {
      return generateGalleryMetadata(segment);
    }

    // Default to home metadata
    return pageMetadata.home;
  }

  generateAltFromFilename(filename) {
    return generateAltFromFilename(filename);
  }

  enrichAltFromGalleryContext(alt, galleryPath) {
    return enrichAltFromGalleryContext(alt, galleryPath);
  }
}

module.exports = new SeoService();
