function generateAltFromFilename(filename) {
    if (filename.startsWith('.')) return '';
    
    const withoutExtension = filename.replace(/\.[^/.]+$/, "");
    const descriptivePart = withoutExtension
        .replace(/^\d{4}-\d{2}-\d{2}-/, "")
        .replace(/^\d{2}-/, "");
    
    let altText = descriptivePart
        .replace(/-/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    
    return altText.charAt(0).toUpperCase() + altText.slice(1);
}

function enrichAltFromGalleryContext(altText, galleryPath) {
    const gallery = galleryPath.split('/').pop()
        .replace(/^\d{8}-/, '');

    if (gallery === 'default') {
      return  altText;
    }
    
    if (!altText.toLowerCase().includes(gallery.toLowerCase())) {
        return `${altText} - ${gallery.replace(/-/g, ' ')}`;
    }
    
    return altText;
}

module.exports = {
    generateAltFromFilename,
    enrichAltFromGalleryContext,
};
