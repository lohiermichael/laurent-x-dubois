const express = require('express');
const router = express.Router();
const path = require('path');

// ############################################################################
// CV Document Route (same file, different paths)
// ############################################################################
// French version
router.get('/CV', (_, response) => {
    response.sendFile(
        path.join(process.cwd(), '/public/data/CVLaurentDuboisPhotography.pdf')
    );
});

// ############################################################################
// Pricing Document Routes
// ############################################################################

router.get('/tarifs', (_, response) => {
    response.sendFile(
        path.join(process.cwd(), '/public/data/tarifs.pdf')
    );
});

// ############################################################################
// Terms of Service Redirects
// ############################################################################

// Wedding Terms
router.get('/CGV_wedding', (_, res) => {  // French version
    res.redirect('https://delivery.laurentxdubois.com/ivfz');
});


// Photoshoot Terms
router.get('/CGV_photoshoot', (_, res) => {  // French version
    res.redirect('https://delivery.laurentxdubois.com/w7m0');
});

module.exports = router;
