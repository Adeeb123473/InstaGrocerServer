// controllers/stripe.controller.js
const stripeService = require('../services/stripeServices');

const handleCreateCheckoutSession = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: 'Invalid or missing amount' });
    }

    const session = await stripeService.createCheckoutSession(amount);
    return res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    return res.status(500).json({ error: 'Failed to create Stripe session' });
  }
};

module.exports = {
  handleCreateCheckoutSession,
};
