const { Router } = require('express')
const { check, body } = require('express-validator')

const { validateJWT } = require('../../Infrastructure/Middlewares/validateJWT')
const { validate } = require('../../Infrastructure/Middlewares/Validator')


const { 
    postsCreatePostController,
    postsGetById,
    postsGetAllController,
    postsUploadImage,
    postsShowImage,
    postsDeletePostController,
    postsUpdatePostController
} = require('../controllers/posts.controller')

const router = Router()


// Methods
// *******

// GET
router.get('/', postsGetAllController)
router.get('/:id', postsGetById)

// Images
router.get('/images/:folder/:id',  postsShowImage)


// PUT
router.put('/:id', 
[
    check('id', 'Must be a mongodb Id').isMongoId()
], postsUpdatePostController)

// POST
router.post('/', [
    body('title').notEmpty(),
    body('overview').notEmpty(),
    body('content').notEmpty(),
    validate
], postsCreatePostController)

// Images
router.post('/upload',  postsUploadImage)

// DELETE
router.delete('/:id', 
[
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validate
], postsDeletePostController)



module.exports = router