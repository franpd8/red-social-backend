const nodemailer = require('nodemailer');
require("dotenv").config();
const user_nodemailer = process.env.USER_NODEMAILER
const pass_nodemailer = process.env.PASS_NODEMAILER

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
        ciphers: 'SSLv3'
    },
    auth:{
        user:user_nodemailer,
        pass:pass_nodemailer
    }
})


module.exports = transporter;

