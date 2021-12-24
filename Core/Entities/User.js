const { Schema, model } = require('mongoose');
const enumRol = require("../Enums/enumRol") 

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory']
    },
    email: {
        type: String,
        required: [true, 'Email is mandatory'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: enumRol
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});



UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user  } = this.toObject();
    user.uid = _id
    return user;
}

module.exports = model( 'User', UserSchema );
