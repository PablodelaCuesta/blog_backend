const User = require("../../Core/Entities/User")
const bcryptjs = require('bcryptjs')

const CreateUser = async (name, email, password, rol) =>
{
    const user = new User({
        name,
        email,
        password,
        rol
    });

    // Encrypt password
    const salt = await bcryptjs.genSalt()
    user.password = await bcryptjs.hash( password, salt )

    // Persist
    await user.save();

    return user;
}

const GetAllUsers = async(query, limit, to) =>
{
    return await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number( to ))
            .limit( Number( limit ))
        ]);
}

const GetUserByEmail = async ( email ) => {
    return await User.findOne({ email });
}

const GetUserById = async ( id ) => {
    return await User.findById({id})
}

const UpdateUser = async(id, password, fields) =>
{
    if ( password ) {
        const salt = await bcryptjs.genSalt();
        fields.password = bcryptjs.hash( password, salt )
    }

    const user = await User.findByIdAndUpdate( id, fields )

    return user;
}

const DeleteUser = async(id) =>
{
    return await User.findByIdAndUpdate(id, { state: false })
}


module.exports = {
    CreateUser,
    GetAllUsers,
    GetUserByEmail,
    GetUserById,
    UpdateUser,
    DeleteUser
};