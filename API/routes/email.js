const { Router } = require('express')
const { check } = require('express-validator');
const { emailSenderController } = require('../controllers/email.controller');

const router = Router();

router.post('/contact', [], emailSenderController)

module.exports = router