const nodemailer = require('nodemailer')
require('dotenv').config

const sendEmail = (message) =>{
    const transform = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'promanitaspf@gmail.com',
            pass: 'jnnfqyjmkcbversi'
        }
    })

    transform.sendMail(message)
}

module.exports={
    sendEmail
}