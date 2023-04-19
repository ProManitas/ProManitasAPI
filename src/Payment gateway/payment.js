const { Contract }= require('../db');
const { sendEmail } = require('../nodemailer/nodemailer');
const { updateModel } = require('../services');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createStripeSession = async (req, res) => {
  // const { contractId } = req.params
  const { id, amount, description, email, contractId } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "USD",
      payment_method: id,
      confirm: true,
      description,
    });

    const updateContract = await updateModel(Contract, contractId, req)

    const html = `<h3> Tu pago ha sido recibido exitosamente!</h3>
    <p>Gracias por aceptar nuestros terminos y condiciones, el contrato realizado tendra una duracion máxima de 10 dias hábiles
    una vez realizado el pago.</p>
    <br/>
    <p>Cualquier incidente e inconveniente puedes comunicarte a este mail, estaremos al tanto de solucionar inquietudes,
    dudas, molestias y demas!</p>
    <h4>Como nos encanta mantener a nuestra familia informada, te notificaremos de nuestras promociones, nuevos post
    que te puedan interesar y mucho más!.</h4>
            `
     
    const message = {
    from: 'promanitaspf@gmail.com', 
    to: email,
    subject: "Bienvenido a Promanitas!",
    text: "Pago realizado exitosamente",
    html: html
    };
 
    sendEmail(message)

    res.status(200).json({ message: "Pago procesado exitosamente." });
  } catch (error) {
    res.status(400).json({message: 'Su pago no ha podido ser procesado', error: error.message });
  }
}

module.exports = {
  createStripeSession,
};