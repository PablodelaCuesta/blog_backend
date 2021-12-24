const { request, response } = require('express');
const bcryptjs = require('bcryptjs')

const { GetUserByEmail } = require('../../Infrastructure/Repositories/UserRepository');
const { generateJWT } = require("../../Infrastructure/Service/generateJWT")

const login = async (req = request, res = response) => {

    const { email, password } = req.body

    try {
        const user = await GetUserByEmail( email )

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
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
            msg: 'Hable con el administrador'
        });        
    }
}

module.exports = {
    login,
}