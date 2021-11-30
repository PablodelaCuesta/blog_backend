const { request, response } = require('express')



const usersControllerGet = (req = request, res = response) => {
    res.status(200).json({
        "msg": "Hello world (GET - Controller)"
    })
}

const usersControllerPut = (req = request, res = response) => {

    const { id } = req.params

    res.status(200).json({
        msg: "PUT API",
        id
    })
}

const usersControllerPost = (req = request, res = response ) => {
    
    const {q, page = 1, limit = 10, apikey} = req.query

    res.status(200).json({
        msg: 'POST API',
        resp: {
            q,
            page,
            limit,
            apikey
        }
    })
}

const usersControllerDelete = (req = request, res = response) => {
    res.status(200).json({
        msg: "DELETE - API"
    })
}


module.exports = {
    usersControllerGet,
    usersControllerPost,
    usersControllerPut,
    usersControllerDelete,
}