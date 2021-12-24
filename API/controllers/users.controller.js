const { request, response } = require('express');
const User = require('../../Core/Entities/User');
const { CreateUser,GetAllUsers,DeleteUser,UpdateUser } = require('../../Infrastructure/Repositories/UserRepository');



const usersControllerGet = async (req = request, res = response) => {

    const { limit = 5, to = 0 } = req.query;
    const query = { estado: true };

    const [ total, users ] = await GetAllUsers(query, limit, to)


    res.status(200).json({
        msg: "success",
        total,
        users
    })
}

const usersControllerPut = async (req = request, res = response) => {

    // Get parameters from params
    const { id } = req.params;
    
    // Get parameters from body request
    const { _id, password, google, email, ...fields } = req.body;

    const user = await UpdateUser(id, password, fields);

    res.status(200).json({
        msg: "success",
        user
    })
}

const usersControllerPost = async (req = request, res = response ) => {
    
    const { name, email, password, rol } = req.body;

    const user = await CreateUser(name, email, password, rol)

    res.json({
        msg: "success",
        user
    });
}

const usersControllerDelete = async (req = request, res = response) => {

    const { id } = req.params

    const user = await DeleteUser(id)
    const userAuth = req.user

    res.status(200).json({
        msg: "DELETE - API",
        user,
        userAuth
    })
}


module.exports = {
    usersControllerGet,
    usersControllerPost,
    usersControllerPut,
    usersControllerDelete,
}