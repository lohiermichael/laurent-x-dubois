const fs = require('fs');
const path = require('path');
const { navigationUrls } = require('../src/utils/urlHelper');

const DOMAIN = 'https://laurentxdubois.com';
const CONFIG_PATH = path.join(__dirname, 'pages-to-index.txt');
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

async function generateSitemap() {
    const pages = fs.readFileSync(CONFIG_PATH, 'utf8')
        .split('\n')
        .filter(line => line.trim());

    const urls = pages.map(key => ({
        fr: navigationUrls[key].fr,
        en: navigationUrls[key].en
    }));

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(url => `  <url>
    <loc>${DOMAIN}${url.fr}</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="${DOMAIN}${url.fr}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${DOMAIN}${url.en}"/>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(OUTPUT_PATH, xml);
}

generateSitemap();
