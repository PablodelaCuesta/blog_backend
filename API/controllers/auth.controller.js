const { request, response } = require('express');
const bcryptjs = require('bcryptjs')

const { GetUserByEmail } = require('../../Infrastructure/Repositories/UserRepository');
const { generateJWT } = require("../../Infrastructure/Service/generateJWT");
const errorAuth = require('../../Core/Errors/auth');

const login = async (req = request, res = response) => {

    const { email, password } = req.body

    try {
        const user = await GetUserByEmail( email )

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: errorAuth.login.userOrPasswordNotCorrent
            });
        }

        // Generar el JWT
        const jwt = await generateJWT( user.id );

        res.status(200).json({
            name: user.name,        
            email,
            jwt
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: errorAuth.server.error500
        });        
    }
}

const loginCookie = async (req = request, res = response) => {

    const { email, password } = req.body

    try {
        const user = await GetUserByEmail( email )

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: errorAuth.login.userOrPasswordNotCorrent
            });
        }

        // Generar el JWT
        const jwt = await generateJWT( user.id );

        res.cookie('jwt', jwt, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            msg: "success"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: errorAuth.server.error500
        });        
    }
}

const logoutCookie = async (req = request, res = response) => {

    const { email, password } = req.body

    try {

        res.cookie('jwt', '', {maxAge: 0})
        res.json({
            msg: 'Unauthenticated'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: errorAuth.server.error500
        });        
    }
}

module.exports = {
    login,
    loginCookie,
    logoutCookie
}