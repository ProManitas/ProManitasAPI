const { Contract }= require('../db');
const { updateModel } = require('../services');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createStripeSession = async (req, res) => {
  // const { contractId } = req.params
  const { id, amount, description, contractId } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "USD",
      payment_method: id,
      confirm: true,
      description,
    });

    const updateContract = await updateModel(Contract, contractId, req)

    res.status(200).json({ message: "Pago procesado exitosamente." });
  } catch (error) {
    res.status(400).json({message: 'Su pago no ha podido ser procesado', error: error.message });
  }
}

module.exports = {
  createStripeSession,
};