const { emailSender } = require("../../Infrastructure/Service/emailSender");

const emailSenderController = async (req, res) => {

    console.log(req.body);

    const { subject, email, message } = req.body;

    const response = await emailSender(email, subject, message);

    if (response.accepted.length === 0) {
        res.status(401).json({
            msg: 'fail',
            code: 401
        })
    }

    res.status(200).json({
        msg: 'success',
        code : 200
    })
}


module.exports = {
    emailSenderController
}