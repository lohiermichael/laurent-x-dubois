const nodemailer = require('nodemailer');
const { SENDER_GMAIL_PASSWORD } = require('../config/environment');

class MailerService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: SENDER_GMAIL_PASSWORD
      }
    });
  }

  async sendContactEmail(formData) {
    const mailOptions = {
      from: formData.email,
      to: 'your-email@gmail.com',
      subject: `New Contact Form Submission from ${formData.name}`,
      text: this.createEmailBody(formData)
    };

    return this.transporter.sendMail(mailOptions);
  }

  createEmailBody(formData) {
    return `
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.telephone || 'Not provided'}
      Website: ${formData.website || 'Not provided'}
      Message: ${formData.message}
    `;
  }
}

module.exports = new MailerService();
