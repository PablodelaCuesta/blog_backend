const { Router } = require('express')
const { check } = require('express-validator')
const { validateJWT } = require('../../Infrastructure/Middlewares/validateJWT')

const { validate } = require("../../Infrastructure/Middlewares/Validator")
const {
    isValidRol,
    emailExist,
    userExistById
} = require("../../Infrastructure/Service/DbValidators")

const { 
    usersControllerGet, 
    usersControllerPost, 
    usersControllerPut, 
    usersControllerDelete
} = require('../controllers/users.controller')

const router = Router()

// GET
router.get('/', usersControllerGet)

// PUT
router.put('/:id', 
[
    check('id', '').isMongoId(),
    check('id').custom( userExistById ),
    check('rol').custom( isValidRol ),
    validate
]
, usersControllerPut)

// POST
router.post('/',
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom( emailExist ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( isValidRol ), 
    validate
], usersControllerPost)

// DELETE
router.delete('/:id', 
[
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistById ),
    validate
], usersControllerDelete)

module.exports = router