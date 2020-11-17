/**
 *  Main controller
 */
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Base route, create PaymentIntent
 */
router.get('/', async function(req, res) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: "usd"
  });
  
  res.render('pages/index', {
    clientSecret: paymentIntent.client_secret
  });
});

module.exports = router;
