const nodemailer = require('nodemailer');

require('dotenv').config()

const email = process.env.EMAIL
const pass = process.env.EMAIL_PW

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PW,
  },
});


module.exports = transporter;
