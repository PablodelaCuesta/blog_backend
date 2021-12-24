const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const { GetUserById } = require('../Repositories/UserRepository')

const validateJWT = async (req = request, res = response, next) => {
    
    const token = req.header('jwt')

    if ( !token ) {
        
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETPRIVATEKEY)

        const user = await GetUserById(uid)
        req.user = user
        
        if ( !user ) {
            res.status(401).json({
                message: "User doesn't exist"
            })
        }

        if ( !user.state ) {
            res.status(401).json({
                message: "User not valid"
            })
        }

        next()

    } catch (error) {

        console.log(error)
        res.status(401).json({
            message: "Token not valid"
        })
    }

}


module.exports = {
    validateJWT
}