const Category = require("../../Core/Entities/Category")
const Post = require("../../Core/Entities/Post")

const CreatePost = async (post) => {

    try {
        const createdPost = new Post({
            ...post
        })

        await createdPost.save()

        return createdPost;

    } catch (error) {
        return error
    }
}

// TODO: Must to be paginated
const GetAll = async (options) => {

    const query = { state: true }
    const sortOption = { ...options, sort: '-timestamp' }

    return await Post.paginate(query, sortOption)
}

const GetById = async (id) => await Post.findById(id)


const UpdatePost = async (id, post) => await Post.findByIdAndUpdate(id, post)


const DeletePost = async (id) => await Post.findByIdAndUpdate(id, { state: false })


module.exports = {
    CreatePost,
    GetAll,
    GetById,
    UpdatePost,
    DeletePost
}