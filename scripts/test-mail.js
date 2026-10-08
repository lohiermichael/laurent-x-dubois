// Sends a test contact email through the real Gmail transport.
// Usage: npm run test:mail [-- recipient@example.com]
require('dotenv').config();

const recipient = process.argv[2];
if (recipient) process.env.RECIPIENT_EMAIL = recipient;

const { sendContactEmail } = require('../src/config/mailer');

sendContactEmail({
  name: 'Test Mail Script',
  email: 'test@example.com',
  telephone: '+33 6 00 00 00 00',
  website: 'https://example.com',
  message: `Test email sent on ${new Date().toISOString()}`
})
  .then(() => console.log(`✅ Test email sent to ${process.env.RECIPIENT_EMAIL}`))
  .catch(() => process.exit(1));
