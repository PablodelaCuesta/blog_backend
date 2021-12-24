const { Router } = require('express')
const { check } = require('express-validator')

const { validate } = require("../../Infrastructure/Middlewares/Validator")
const {
    emailExist,
    userIsActive
} = require("../../Infrastructure/Service/DbValidators")

const { 
    login,
} = require('../controllers/auth.controller')

const router = Router()

// POST
router.post('/login',
[
    check('email', 'Email is mandatory').isEmail(),
    check('email', 'User is not active').custom( userIsActive ),
    check('password', 'The password is mandatory').not().isEmpty(),
    validate
], login)


module.exports = router