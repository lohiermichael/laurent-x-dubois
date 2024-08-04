// ############################################################################
// Imports
// ############################################################################

// Library imports
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ############################################################################
// Configuration
// ############################################################################

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

const GALLERIES_FOLDER = path.join(__dirname, '/public/galleries/');
const GALLERY_NAMES = fs.readdirSync(GALLERIES_FOLDER).reverse();
let galleryPath = '';
let imageNames = [];

// Static files
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/data', express.static(path.join(__dirname, 'public/data')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/galleries', express.static(path.join(__dirname, 'public/galleries')));

// Set views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ############################################################################
// Statistics
// ############################################################################

const googleAnalyticsMeasurementId = process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID;

// Store SEO words in a local variable
const SEOFilePath = path.join(__dirname, '/public/data/SEOWords.txt');
let SEOFile = fs.readFileSync(SEOFilePath, 'utf8');
let SEOWords = SEOFile.split('\n');

// ############################################################################
// Routes
// ############################################################################

// Main route: gallery with photos in the main folder
app.get('/', (_, response) => {

    // Get all images in the file
    galleryPath = path.join(GALLERIES_FOLDER, 'default');
    imageNames = fs.readdirSync(path.join(galleryPath, 'images')).reverse();

    let videosFolderExists = fs.existsSync(path.join(galleryPath, '/videos/'));

    console.log(imageNames)
    console.log(galleryPath)

    response.render('gallery', {
        galleryPath: '/galleries/default',
        imageNames,
        videosFolderExists,
        googleAnalyticsMeasurementId,
        SEOWords,
    });
});

// Contact GET route: Empty form data returned
app.get('/contact', (_, response) => {
    response.render('contact', {
        alertMsgPerInput: new Map(),
        nameInput: '',
        emailInput: '',
        telephoneInput: '',
        websiteInput: '',
        messageInput: '',
        googleAnalyticsMeasurementId,
    });
});

// Thanks route
app.get('/thanks', (_, response) => {
    response.render('thanks', { googleAnalyticsMeasurementId, });
});

// Gallery routes: gallery with photos of one of the folders of GALLERY_NAMES
app.get('/:galleryName', (request, response) => {
    let galleryName = request.params['galleryName'];
    if (!GALLERY_NAMES.includes(galleryName)) {
        response.status(404).render('404', { googleAnalyticsMeasurementId, })
    } else {
        // Get all images in the file
        galleryPath = path.join(GALLERIES_FOLDER, galleryName);
        imageNames = fs.readdirSync(path.join(galleryPath, 'images')).reverse();

        let videosFolderExists = fs.existsSync(path.join(galleryPath, '/videos/'));

        response.render(
            'gallery',
            {
                galleryPath: `/galleries/${galleryName}`,
                imageNames, videosFolderExists, googleAnalyticsMeasurementId,
                SEOWords,
            }
        );
    }
});


// Wild card
app.get('*', (_, response) => {
    response.render('404', { googleAnalyticsMeasurementId, })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
