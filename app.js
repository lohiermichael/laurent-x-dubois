// ############################################################################
// Imports
// ############################################################################

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ############################################################################
// Configuration
// ############################################################################

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Static files
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// Set views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ############################################################################
// Statistics
// ############################################################################

const googleAnalyticsMeasurementId = process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID;

// ############################################################################
// Routes
// ############################################################################

app.get('/', (_, res) => {
  res.send('<p>Hello World!</p>');
});

// Thanks route
app.get('/thanks', (_, response) => {
    response.render('thanks', { googleAnalyticsMeasurementId, });
});

// Wild card
app.get('*', (_, response) => {
    response.render('404', { googleAnalyticsMeasurementId, })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
