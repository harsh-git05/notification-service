const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your email provider
    auth: {
        user: process.env.EMAIL_USER, // Use your Gmail address
        pass: process.env.EMAIL_PASS, // Use environment variables for security
    },
});

async function sendEmail(recipient, message) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: recipient,
        subject: 'New Notification',
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = sendEmail;
