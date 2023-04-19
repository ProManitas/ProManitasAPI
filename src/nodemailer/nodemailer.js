const nodemailer = require('nodemailer')
require('dotenv').config

const sendEmail = (message) =>{
    const transform = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    })

    transform.sendMail(message)
}

module.exports={
    sendEmail
}