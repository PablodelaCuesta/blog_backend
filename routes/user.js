



const { Router } = require('express')
const { 
    usersControllerGet, 
    usersControllerPost, 
    usersControllerPut, 
    usersControllerDelete
} = require('../controllers/users.controller')

const router = Router()

router.get('/', usersControllerGet)
router.put('/:id', usersControllerPut)
router.post('/', usersControllerPost)
router.delete('/', usersControllerDelete)

module.exports = router