const {
  pageMetadata,
  generateGalleryMetadata,
  generateAltFromFilename,
  enrichAltFromGalleryContext
} = require('../utils/seo');

class SeoService {
  getMetadataForPath(path, language = 'fr') {
    // Remove language prefix if present
    const cleanPath = path.replace(/^\/en\//, '/');

    // Remove leading slash and get first segment
    const segment = cleanPath.split('/')[1] || 'home';


    // Get metadata for the current language
    const languageMetadata = pageMetadata[language];

    if (segment in languageMetadata) {
        return languageMetadata[segment];
    }

    // If it's a gallery path
    if (path !== '/galleries') {
      return generateGalleryMetadata(segment, language);
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
