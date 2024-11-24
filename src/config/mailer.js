const nodemailer = require('nodemailer');
const { SENDER_GMAIL_PASSWORD } = require('./environment');

/**
 * Creates a nodemailer transport configuration for Gmail
 * 
 * @param {Object} options Optional transport configuration overrides
 * @returns {nodemailer.Transporter} Configured nodemailer transport
 */
function createTransport(options = {}) {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_GMAIL_USER,
      pass: SENDER_GMAIL_PASSWORD
    },
    ...options
  });
}

/**
 * Creates the HTML email template for contact form submissions
 * 
 * @param {Object} formData Contact form data
 * @param {string} formData.name Contact name
 * @param {string} formData.email Contact email
 * @param {string} formData.telephone Contact phone number
 * @param {string} formData.website Contact website
 * @param {string} formData.message Contact message
 * @returns {string} Formatted HTML email content
 */
function createEmailTemplate(formData) {
  return `
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
            <!-- Header -->
            <div style="text-align: center; padding: 20px; background-color: #181818; border-radius: 8px; margin-bottom: 20px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Nouveau contact</h1>
                <p style="color: #888888; margin: 10px 0 0 0;">laurentxdubois.com</p>
            </div>

            <!-- Introduction -->
            <div style="margin-bottom: 30px; color: #181818;">
                <p style="font-size: 16px; line-height: 1.5;">Bonjour Laurent,</p>
                <p style="font-size: 16px; line-height: 1.5;">Un nouveau message a été envoyé via votre portfolio.</p>
            </div>

            <!-- Contact Information -->
            <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <!-- Name -->
                <div style="margin-bottom: 20px;">
                    <h3 style="color: #181818; margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Nom</h3>
                    <p style="color: #333333; margin: 5px 0 0 0; font-size: 16px;">${formData.name}</p>
                </div>

                <!-- Email -->
                <div style="margin-bottom: 20px;">
                    <h3 style="color: #181818; margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Email</h3>
                    <p style="color: #333333; margin: 5px 0 0 0; font-size: 16px;"><a href="mailto:${formData.email}" style="color: #888888; text-decoration: none;" onmouseover="this.style.color='#9b0e0e'" onmouseout="this.style.color='#888888'">${formData.email}</a></p>
                </div>

                <!-- Phone -->
                <div style="margin-bottom: 20px;">
                    <h3 style="color: #181818; margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Téléphone</h3>
                    <p style="color: #333333; margin: 5px 0 0 0; font-size: 16px;"><a href="tel:${formData.telephone}" style="color: #888888; text-decoration: none;" onmouseover="this.style.color='#9b0e0e'" onmouseout="this.style.color='#888888'">${formData.telephone}</a></p>
                </div>

                <!-- Website -->
                <div style="margin-bottom: 20px;">
                    <h3 style="color: #181818; margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Site Web</h3>
                    <p style="color: #333333; margin: 5px 0 0 0; font-size: 16px;"><a href="${formData.website}" style="color: #888888; text-decoration: none;" onmouseover="this.style.color='#9b0e0e'" onmouseout="this.style.color='#888888'">${formData.website}</a></p>
                </div>
            </div>

            <!-- Message -->
            <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h3 style="color: #181818; margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Message</h3>
                <div style="color: #333333; margin: 10px 0 0 0; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${formData.message}</div>
            </div>

            <!-- Call to Action -->
            <div style="text-align: center; margin-bottom: 30px;">
                <a href="mailto:${formData.email}" style="display: inline-block; padding: 12px 24px; background-color: #181818; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">Répondre au message</a>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e2e2;">
                <p style="color: #666666; font-size: 14px; margin: 0;">Message automatique envoyé depuis</p>
                <p style="color: #666666; font-size: 14px; margin: 5px 0 0 0;">laurentxdubois.com</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

/**
 * Send an email with the contact form submission
 * 
 * @param {Object} formData Contact form data
 * @returns {Promise} Result of email sending operation
 */
async function sendContactEmail(formData) {
  const transporter = createTransport();

  const mailOptions = {
    from: process.env.SENDER_GMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: '📬 Nouveau contact - Site LaurentXDubois.com',
    html: createEmailTemplate(formData)
  };

  try {
    await transporter.sendMail(mailOptions);
    return Promise.resolve('Email successfully sent!');
  } catch (error) {
    console.error('Error sending email:', error);
    return Promise.reject(error);
  }
}

module.exports = {
  createTransport,
  sendContactEmail
};
