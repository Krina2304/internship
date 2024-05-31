// utils/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other email services
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password'
    }
});

const sendConfirmationEmail = (to) => {
    const mailOptions = {
        from: 'your_email@gmail.com',
        to,
        subject: 'Welcome to our service!',
        text: 'Thank you for signing up. Your account has been successfully created.'
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendConfirmationEmail;