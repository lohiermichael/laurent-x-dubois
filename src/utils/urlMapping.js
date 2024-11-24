/**
 * Static URL mapping configuration for fixed routes
 * Format: 'fr-url': 'en-url'
 * 
 * Note: French URLs are the default (without prefix)
 * English URLs will have '/en/' prefix added automatically
 */
const staticUrlMappings = {
  'contactez-nous': 'contact',
  'mode': 'fashion',
  'tests-agence': 'agency-test',
  'editorial': 'editorial',
  'merci': 'thanks',
  'a-propos': 'about'
};

/**
 * Get corresponding URL in target language
 * @param {string} url - Current URL path
 * @param {string} targetLang - Target language ('en' or 'fr')
 * @returns {string} Translated URL path
 */
function getTranslatedUrl(url, targetLang) {
  // Remove leading and trailing slashes
  const cleanUrl = url.replace(/^\/|\/$/g, '');
  
  // Remove language prefix if exists
  const urlWithoutLang = cleanUrl.replace(/^en\//, '');

  // Check if this is a gallery URL (not in static mappings)
  const isGalleryUrl = !Object.values(staticUrlMappings).includes(urlWithoutLang) && 
                      !Object.keys(staticUrlMappings).includes(urlWithoutLang);

  if (targetLang === 'en') {
    // If it's a gallery URL, just add /en/ prefix
    if (isGalleryUrl) {
      return `/en/${urlWithoutLang}`;
    }
    // Otherwise look up the English translation
    const englishUrl = Object.entries(staticUrlMappings)
      .find(([fr]) => fr === urlWithoutLang)?.[1] || urlWithoutLang;
    return `/en/${englishUrl}`;
  } else {
    // If it's a gallery URL, just remove /en/ prefix if present
    if (isGalleryUrl) {
      return `/${urlWithoutLang}`;
    }
    // Otherwise look up the French translation
    const frenchUrl = Object.entries(staticUrlMappings)
      .find(([_, en]) => en === urlWithoutLang)?.[0] || urlWithoutLang;
    return `/${frenchUrl}`;
  }
}

/**
 * Get URL in both languages
 * @param {string} url - Current URL path
 * @returns {Object} URLs for both languages
 */
function getLanguageUrls(url) {
  return {
    fr: getTranslatedUrl(url, 'fr'),
    en: getTranslatedUrl(url, 'en')
  };
}


/**
 * Get the actual gallery folder name from URL parameter
 * @param {string} urlParam - Gallery name from URL
 * @param {string} language - Current language (en/fr)
 * @returns {string} Actual gallery folder name
 */
function getGalleryFolder(urlParam, language) {
  if (language === 'en') {
    return urlParam; // English URLs match folder names directly
  }
  
  // For French URLs, look up the English equivalent or return the original
  return staticUrlMappings[urlParam] || urlParam;
}

module.exports = {
  getTranslatedUrl,
  getLanguageUrls,
  getGalleryFolder,
};
