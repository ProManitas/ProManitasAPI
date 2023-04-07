const { Router } = require('express');
const router = Router()

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const YOUR_DOMAIN = 'http://localhost:3000';

router.post('/', async (req, res) => {
    const { price } = req.body
    try {
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price: price,
              quantity: 1,
              currency: 'USD'
            },
          ],
          mode: 'payment',
          success_url: `${YOUR_DOMAIN}?success=true`,
          cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        });
      
        res.redirect(303, session.url);
    } catch (error) {
        res.status(500).send({
          message: 'Ocurrio un error al procesar el pago', 
          error: error.message
        })
    }
});

module.exports = router