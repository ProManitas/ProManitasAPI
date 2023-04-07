const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Contract } = require('../models'); // importa el modelo de pagos

const createStripeSession = async (priceId, successUrl, cancelUrl) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session.url;
};

module.exports = {
  stripe,
  createStripeSession,
};

// const { stripe, createStripeSession } = require('./stripe');

const YOUR_DOMAIN = 'http://localhost:3001';

app.post('/create-checkout-session', async (req, res) => {
  const sessionUrl = await createStripeSession('{{PRICE_ID}}', `${YOUR_DOMAIN}?success=true`, `${YOUR_DOMAIN}?canceled=true`);
  res.redirect(303, sessionUrl);
});



module.exports = {
    createStripeSession
}
