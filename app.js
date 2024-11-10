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
        subject: '📬 Nouveau contact - Site LaurentXDubois.com',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nouveau contact</title>
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet">
        </head>
        <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: 'Lato', sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <!-- Header avec Logo/Nom -->
                <div style="text-align: center; padding: 20px; background-color: #181818; border-radius: 8px; margin-bottom: 20px;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Nouveau contact</h1>
                    <p style="color: #888888; margin: 10px 0 0 0;">laurentxdubois.com</p>
                </div>
    
                <!-- Introduction -->
                <div style="margin-bottom: 30px; color: #181818;">
                    <p style="font-size: 16px; line-height: 1.5;">Bonjour Laurent,</p>
                    <p style="font-size: 16px; line-height: 1.5;">Un nouveau message a été envoyé via votre portfolio.</p>
                </div>
    
                <!-- Informations du Contact -->
                <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <!-- Nom -->
                    <div style="margin-bottom: 20px;">
                        <h3 style="color: #181818; margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Nom</h3>
                        <p style="color: #333333; margin: 5px 0 0 0; font-size: 16px;">${name}</p>
                    </div>
    
                    <!-- Email -->
                    <div style="margin-bottom: 20px;">
                        <h3 style="color: #181818; margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Email</h3>
                        <p style="color: #333333; margin: 5px 0 0 0; font-size: 16px;"><a href="mailto:${email}" style="color: #888888; text-decoration: none;" onmouseover="this.style.color='#9b0e0e'" onmouseout="this.style.color='#888888'">${email}</a></p>
                    </div>
    
                    <!-- Téléphone -->
                    <div style="margin-bottom: 20px;">
                        <h3 style="color: #181818; margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Téléphone</h3>
                        <p style="color: #333333; margin: 5px 0 0 0; font-size: 16px;"><a href="tel:${telephone}" style="color: #888888; text-decoration: none;" onmouseover="this.style.color='#9b0e0e'" onmouseout="this.style.color='#888888'">${telephone}</a></p>
                    </div>
    
                    <!-- Site Web -->
                    <div style="margin-bottom: 20px;">
                        <h3 style="color: #181818; margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Site Web</h3>
                        <p style="color: #333333; margin: 5px 0 0 0; font-size: 16px;"><a href="${website}" style="color: #888888; text-decoration: none;" onmouseover="this.style.color='#9b0e0e'" onmouseout="this.style.color='#888888'">${website}</a></p>
                    </div>
                </div>
    
                <!-- Message -->
                <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                    <h3 style="color: #181818; margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Message</h3>
                    <div style="color: #333333; margin: 10px 0 0 0; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                </div>
    
                <!-- Call to Action -->
                <div style="text-align: center; margin-bottom: 30px;">
                    <a href="mailto:${email}" style="display: inline-block; padding: 12px 24px; background-color: #181818; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">Répondre au message</a>
                </div>
    
                <!-- Footer -->
                <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e2e2;">
                    <p style="color: #666666; font-size: 14px; margin: 0;">Message automatique envoyé depuis</p>
                    <p style="color: #666666; font-size: 14px; margin: 5px 0 0 0;">laurentxdubois.com</p>
                </div>
            </div>
        </body>
        </html>
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

// Secret route with the list of all galleries
app.get('/__all__', (_, response) => {
    response.render('all-galleries', {
        galleries: GALLERY_NAMES,
        googleAnalyticsMeasurementId,
    })
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

// ----------------------------------------------------------------------------
// Redirect routes
// ----------------------------------------------------------------------------

// CGV Wedding
app.get('/CGV_wedding', (_, res) => {
    res.redirect('https://delivery.laurentxdubois.com/ivfz');
});

// CGV Photo shoot
app.get('/CGV_photoshoot', (_, res) => {
    res.redirect('https://delivery.laurentxdubois.com/w7m0');
});

// ----------------------------------------------------------------------------

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
