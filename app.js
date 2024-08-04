// ############################################################################
// Imports
// ############################################################################

// Library imports
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import { check, validationResult } from 'express-validator';
import fs from 'fs';
import nodeMailer from 'nodemailer';
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

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
// E-mails
// ############################################################################

// Function to send an email on the contact form
async function sendEmail(name, email, telephone, website, message) {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_GMAIL_USER,
            pass: process.env.SENDER_GMAIL_PASSWORD,
            }
    });
    const mailOptions = {
        from: process.env.SENDER_GMAIL_USER,
        to: process.env.RECIPIENT_EMAIL,
        subject: 'NOUVEAU CONTACT sur LaurentXDubois',
        html: `
        Bonjour Laurent, <br><br>
        Tu as un nouveau message sur laurentxdubois.com: <br><br>
        <hr>
        <h3>Name:</h3> ${name} <br><br>
        <hr>
        <h3>Email:</h3> ${email} <br><br>
        <hr>
        <h3>Telephone:</h3> ${telephone} <br><br>
        <hr>
        <h3>Website:</h3> ${website} <br><br>
        <hr>
        <h3>Message:</h3><br>
        ${message} <br><br>
        <hr>
        <br><br>
        Pense à le recontacter! <br><br>

        Le bot de laurentxdubois.com
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return Promise.resolve('Email successfully sent!');
    } catch (error) {
        return Promise.reject(error);
    }
}


// ############################################################################
// Routes
// ############################################################################

// Main route: gallery with photos in the main folder
app.get('/', (_, response) => {

    // Get all images in the file
    galleryPath = path.join(GALLERIES_FOLDER, 'default');
    imageNames = fs.readdirSync(path.join(galleryPath, 'images')).reverse();

    let videosFolderExists = fs.existsSync(path.join(galleryPath, '/videos/'));

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

// Contact POST route: validate form and send an email
// - If the form is not validated, we're redirected to the contact GET route
// and the form is filled with the latest changes
// - If the form is validated, we're redirected to the thanks route
app.post(
    '/contact',
    check('name')
        .not().isEmpty()
            .withMessage('The name is required'),
    check('email')
        .not().isEmpty()
            .withMessage('The email is required')
        .bail()
        .isEmail()
            .withMessage('Please enter a valid email')
        .normalizeEmail(),
    check('message')
        .not().isEmpty()
            .withMessage('The message is required'),
    async (request, response) => {
        const errors = validationResult(request);
        const { name, email, telephone, website, message } = request.body;
        if (!errors.isEmpty()) {
            const alerts = errors.array();
            const alertMsgPerInput = new Map();
            alerts.forEach(alert => {
                alertMsgPerInput.set(alert.path, alert.msg);
            });
            return response.render('contact', {
                alertMsgPerInput,
                nameInput: name,
                emailInput: email,
                telephoneInput: telephone,
                websiteInput: website,
                messageInput: message,
                googleAnalyticsMeasurementId,
            })
        }
    try {
        await sendEmail(name, email, telephone, website, message);
        console.info('Email sent successfully!')
        return response.redirect('thanks');
    } catch (error) {
        console.error('Error:', error);
        return response.status(500).send('Server error :(');
    }
});

// Thanks route
app.get('/thanks', (_, response) => {
    response.render('thanks', { googleAnalyticsMeasurementId, });
});

// ----------------------------------------------------------------------------
// File routes
// ----------------------------------------------------------------------------

// CV route
app.get('/CV', (_, response) => {
    response.sendFile(
        path.join(__dirname, '/public/data/CVLaurentDuboisPhotography.pdf')
    );
});

// Tariffs route
app.get('/tarifs', (_, response) => {
    response.sendFile(
        path.join(__dirname, '/public/data/tarifs.pdf')
    );
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
