const { Router } = require('express')
const { check } = require('express-validator')
const { validateJWT } = require('../../Infrastructure/Middlewares/validateJWT')

const { loggingInfo } = require("../../Infrastructure/Middlewares/logging")


const { 
    postsCreatePostController,
    postsGetById,
    postsGetAllController
} = require('../controllers/posts.controller')

const router = Router()

// GET
router.get('/', [loggingInfo],postsGetAllController)
router.get('/:id', [loggingInfo],postsGetById)

// PUT
// router.put('/:id', 
// [
//     check('id', '').isMongoId(),
//     check('id').custom( userExistById ),
//     check('rol').custom( isValidRol ),
//     validate
// ]
// , )

// POST
router.post('/', [loggingInfo],postsCreatePostController)

// DELETE
// router.delete('/:id', 
// [
//     validateJWT,
//     check('id', 'No es un ID válido').isMongoId(),
//     check('id').custom( userExistById ),
//     validate
// ], usersControllerDelete)

module.exports = router