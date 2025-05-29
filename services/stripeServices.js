// services/stripe.service.js
const Stripe = require('stripe');
const stripe = Stripe(process.env.Stripe_API_KEY); // Replace with your Stripe secret key

const createCheckoutSession = async (amount) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Order Payment',
          },
          unit_amount: amount * 100, // amount in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });

  return session;
};

module.exports = {
  createCheckoutSession,
};
