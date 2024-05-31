// utils/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other email services
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password'
    }
});

const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: 'your_email@gmail.com',
        to,
        subject,
        text
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendMail;