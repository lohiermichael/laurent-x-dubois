// src/utils/urlHelper.js

/**
 * URL mapping for navigation
 * Format: 'path': { fr: 'french-path', en: 'english-path' }
 */
const navigationUrls = {
  home: { fr: '/', en: '/en' },
  fashion: { fr: '/mode', en: '/en/fashion' },
  fashionWeek1: { fr: '/fashion-week-1', en: '/en/fashion-week-1' },
  fashionWeek2: { fr: '/fashion-week-2', en: '/en/fashion-week-2' },
  portraits: { fr: '/portraits', en: '/en/portraits' },
  projects: { fr: '/projets', en: '/en/projects' },
  agencyTest: { fr: '/tests-agence', en: '/en/agency-test' },
  editorial: { fr: '/editorial', en: '/en/editorial' },
  contact: { fr: '/contactez-nous', en: '/en/contact' }
};

/**
 * Get URL for a specific page in the current language
 * @param {string} page - Page identifier from navigationUrls
 * @param {string} language - Current language ('en' or 'fr')
 * @returns {string} URL for the page in the specified language
 */
function getPageUrl(page, language) {
  return navigationUrls[page]?.[language] ?? navigationUrls[page]?.fr ?? '/';
}

module.exports = {
  getPageUrl,
  navigationUrls
};
