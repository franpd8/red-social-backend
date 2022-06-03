const nodemailer = require('nodemailer');
// const { auth } = require('./keys.js')
require("dotenv").config();
const {user_nodemailer} = process.env.USER_NODEMAILER
const {pass_nodemailer} = process.env.PASS_NODEMAILER

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
        ciphers: 'SSLv3'
    },
    auth:{
        user_nodemailer,
        pass_nodemailer
    }
})



module.exports = transporter;

