const nodemailer = require('nodemailer')

const emailSender = async (emailFrom, subject, message) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_PASS
        }
    });

    const mailOptions = {
        from: emailFrom,
        to: process.env.ADMIN_EMAIL,
        subject: subject,
        text: message,
    };

    return await transporter.sendMail( mailOptions)
}

module.exports = {
    emailSender
}