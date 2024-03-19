/**
 *  Main controller
 */
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors')
var corsOptions = {
  origin: 'https://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

/**
 * Base route, create PaymentIntent
 */
router.get('/',cors(corsOptions), async function(req, res) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: "usd",
    capture_method: 'manual',
  });
  
  res.render('pages/index', {
    clientSecret: paymentIntent.client_secret
  });
});

router.post('/create-payment-intent', cors(corsOptions), async function(req, res) {
console.log(req.body);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      ...req.body
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
