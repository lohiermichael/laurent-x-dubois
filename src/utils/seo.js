const pageMetadata = {
    home: {
        title: 'Laurent X. Dubois | Fashion & Portrait Photographer in Paris',
        description:
            'Discover the portfolio of Laurent X. Dubois, professional fashion ' +
            'and portrait photographer based in Paris. Specializing in fashion ' +
            'week, editorial, and commercial photography.'
    },
    contact: {
        title: 'Contact Laurent X. Dubois | Professional Photography Services',
        description:
            'Book Laurent X. Dubois for your photography needs in Paris. ' +
            'Specialized in fashion, corporate, editorial photography and video ' +
            'services. Get in touch for rates and availability.'
    },
    thanks: {
        title: 'Thank You | Laurent X. Dubois Photography',
        description:
            'Thank you for contacting Laurent X. Dubois Photography. We will ' +
            'respond to your inquiry shortly.'
    },
    notFound: {
        title: 'Page Not Found | Laurent X. Dubois Photography',
        description:
            'The requested page could not be found. Please visit our homepage ' +
            'to explore Laurent X. Dubois\'s photography portfolio.'
    }
};


function generateGalleryMetadata(galleryName) {
    const formattedName = galleryName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const title = `${formattedName} Photography | Laurent X. Dubois Paris`;
    const description =
        `View our exclusive ${formattedName.toLowerCase()} photography ` +
        'collection. Professional photography services in Paris by Laurent X. ' +
        'Dubois, specializing in fashion, portraits, and editorial work.';

    return { title, description };
}

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
    pageMetadata,
    generateGalleryMetadata,
    generateAltFromFilename,
    enrichAltFromGalleryContext,
};
