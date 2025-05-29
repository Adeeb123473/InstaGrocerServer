// routes/stripe.routes.js
const express = require('express');
const router = express.Router();
const stripeController = require('../controller/stripeController');

router.post('/create-checkout-session', stripeController.handleCreateCheckoutSession);

module.exports = router;
