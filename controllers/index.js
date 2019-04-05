/**
 *  Main controller
 */
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * base route
 */
router.get('/', function(req, res) {
  res.render('pages/index');
});

/**
 * Create charge
 */
router.post('/charge', async function(req, res) {
  const token = req.body.stripeToken;

  const charge = await stripe.charges.create({
    amount: 2000,
    currency: "usd",
    source: token, // obtained with Stripe.js
    description: "Sample charge"
  });

  req.flash('success', `Successfully charged $${charge.amount / 100}! Your charge ID is ${charge.id}.`)
  res.redirect('/')
});

module.exports = router;
