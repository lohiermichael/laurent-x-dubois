const fs = require('fs');
const path = require('path');

function loadTranslations(language) {
    const translations = {};
    const rootPath = path.join(__dirname, '../..');
    const componentsPath = path.join(rootPath, 'locales', language, 'components');
    const pagesPath = path.join(rootPath, 'locales', language, 'pages');
    const commonPath = path.join(rootPath, 'locales', language, 'common');

    // Load components translations
    fs.readdirSync(componentsPath).forEach(file => {
        const name = path.parse(file).name;
        translations[`components.${name}`] = require(path.join(componentsPath, file));
    });

    // Load pages translations
    fs.readdirSync(pagesPath).forEach(file => {
        const name = path.parse(file).name;
        translations[`pages.${name}`] = require(path.join(pagesPath, file));
    });

    // Load common translations
    fs.readdirSync(commonPath).forEach(file => {
        const name = path.parse(file).name;
        translations[`common.${name}`] = require(path.join(commonPath, file));
    });

    return translations;
}

// Simplified translation helper function
function getTranslation(translations, key) {
    const [section, file, ...path] = key.split('.');
    const fullKey = `${section}.${file}`;
    
    if (!translations[fullKey]) return key;
    
    let result = translations[fullKey];
    for (const p of path) {
        result = result[p];
        if (result === undefined) return key;
    }
    
    return result;
}

// Load both languages
const translations = {
    fr: loadTranslations('fr'),
    en: loadTranslations('en')
};

module.exports = {
    translations,
    getTranslation
};
