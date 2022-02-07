const { emailSender } = require("../../Infrastructure/Service/emailSender");

const emailSenderController = async (req, res) => {

    console.log(req.body);

    const { subject, email, message } = req.body;

    const response = emailSender(email, subject, message);

    res.status(200).json({
        msg: 'success',
        response
    })
}


module.exports = {
    emailSenderController
}