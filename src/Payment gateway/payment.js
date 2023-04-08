const { User } = require('../db');
const { createNew } = require('../services');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createStripeSession = async (req, res) => {
  const { id, amount, description, username } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "USD",
      payment_method: id,
      confirm: true,
      description,
    });

//FALTA VER COMO MANDAN LA FECHA DE TERMINACION DEL SERVICIO  
    const createContract = await createNew('Contract', req)

    const findUser = await User.findOne({where: {username : username}})
    await findUser.addContract(createContract)

    res.status(200).json({ message: "Pago procesado exitosamente." });
  } catch (error) {
    res.status(400).json({message: 'Su pago no ha podido ser procesado', error: error.message });
  }
}

module.exports = {
  createStripeSession,
};