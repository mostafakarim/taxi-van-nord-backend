/**
 *  Main controller
 */
const express = require('express');
const router = express.Router();
require('dotenv').config({path: './.env'});
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
/**
 * Base route, create PaymentIntent
 */


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '>Forbidden access' });
});

router.post('/create-payment-intent', async function(req, res, next) {
console.log(process.env.STRIPE_SECRET_KEY);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      ...req.body
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/webhook', express.json({type: 'application/json'}), (request, response) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  console.log(event.type);
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(paymentIntent);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'charge.captured':
      console.log('ENVOIE L-EMAIL');
      
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});

router.get('/health', function(req, res, next) {
  res.status(200).send('success !');
});

module.exports = router;
