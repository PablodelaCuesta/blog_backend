const nodemailer = require('nodemailer')

const emailSender = (emailFrom, subject, message) => {

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

    const response = transporter.sendMail( mailOptions, (error, info) => {
        if (error) {
            console.log(error);

            return false
        }

        return true
    })

    return response;
}

module.exports = {
    emailSender
}