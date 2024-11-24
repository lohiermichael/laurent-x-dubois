const pageMetadata = {
    en: {
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
    },
    fr: {
        home: {
            title: 'Laurent X. Dubois | Photographe Mode et Portrait à Paris',
            description:
                'Découvrez le portfolio de Laurent X. Dubois, photographe professionnel ' +
                'de mode et portrait basé à Paris. Spécialisé dans la fashion week, ' +
                'l\'éditorial et la photographie commerciale.'
        },
        contact: {
            title: 'Contact Laurent X. Dubois | Services de Photographie Professionnelle',
            description:
                'Réservez Laurent X. Dubois pour vos besoins en photographie à Paris. ' +
                'Spécialisé dans la mode, le corporate, la photographie éditoriale et ' +
                'les services vidéo. Contactez-nous pour les tarifs et disponibilités.'
        },
        thanks: {
            title: 'Merci | Laurent X. Dubois Photographie',
            description:
                'Merci d\'avoir contacté Laurent X. Dubois Photographie. Nous répondrons ' +
                'à votre demande dans les plus brefs délais.'
        },
        notFound: {
            title: 'Page Non Trouvée | Laurent X. Dubois Photographie',
            description:
                'La page demandée n\'a pas été trouvée. Veuillez visiter notre page ' +
                'd\'accueil pour explorer le portfolio de Laurent X. Dubois.'
        }
    }
};

function generateGalleryMetadata(galleryName, language = 'fr') {
    const formattedName = galleryName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    if (language === 'fr') {
        const title = `${formattedName} Photographie | Laurent X. Dubois Paris`;
        const description =
            `Découvrez notre collection exclusive de photographie ${formattedName.toLowerCase()}. ` +
            'Services de photographie professionnelle à Paris par Laurent X. Dubois, ' +
            'spécialisé dans la mode, les portraits et le travail éditorial.';
        return { title, description };
    }

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
        return altText;
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
