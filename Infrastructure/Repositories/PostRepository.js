const Category = require("../../Core/Entities/Category")
const Post = require("../../Core/Entities/Post")

const CreatePost = async (post) => {
    const createdPost = new Post({
        ...post
    })

    await createdPost.save()

    // if ( post.categories.length > 0) {
    //     post.categories.map( async (categoryId) => { 
    //         await Category.findByIdAndUpdate(categoryId, { $push: {posts: createdPost.id }} )
    //      })
    // }


    return createdPost
}

// TODO: Must to be paginated
const GetAll = async (options) => {

    const query = { state: true }
    const sortOption = { ...options, sort: '-timestamp'}

    return await Post.paginate(query, sortOption)

    // return await Promise.all([
    //     Post.countDocuments(query),
    //     Post.find(query)
    //         .skip( Number( from ))
    //         .limit( Number( limit ))
    //         .sort('-timestamp')
    // ])
}

const GetById = async (id) => {
    return await Post.findById(id)
}


const UpdatePost = () => {

}


const DeletePost = async (id) => {
    return await Post.findByIdAndUpdate(id, { state: false })
}


module.exports = {
    CreatePost,
    GetAll,
    GetById,
    UpdatePost,
    DeletePost
}