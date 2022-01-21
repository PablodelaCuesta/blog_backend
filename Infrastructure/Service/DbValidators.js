const Rol = require('../../Core/Entities/Rol');
const User = require('../../Core/Entities/User');

const isValidRol = async(rol = '') => {

    const existeRol = await Rol.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExist = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await User.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const userExistById = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await User.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const userIsActive = async( email ) => {

    // Verify if user is active
    const user = await User.findOne({ email });

    if ( !user ) {
        throw new Error(`The email: ${ email }, doesn't exists`);
    }

    if ( !user.state ) {
        throw new Error(`The user ${ email } is inactive`);
    }
}




module.exports = {
    isValidRol,
    emailExist,
    userExistById,
    userIsActive
}

