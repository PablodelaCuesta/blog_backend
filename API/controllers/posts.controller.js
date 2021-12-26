const { request, response } = require('express');
const { CreatePost,GetAll,DeletePost,UpdatePost, GetById } = require('../../Infrastructure/Repositories/PostRepository');

const postsGetAllController = async (req = request, res = response) => {
    
    const { page = 1 } = req.query
    const from = (Number( page ) - 1) * 5

    const [count, posts] = await GetAll(from, 5)

    res.json({
        msg: "success",
        count,
        posts
    })
}

const postsGetById = async (req = request, res = response) => {
    const { id } = req.params
    const post = await GetById(id)

    res.status(200).json({
        post
    })
}

const postsCreatePostController = async (req = request, res = response) => {
    const { title, overview, content, categories, state = true } = req.body

    const post = await CreatePost({title, overview, content, categories, state})

    res.json({
        msg: "success",
        post
    })
}


module.exports = {
    postsGetAllController,
    postsGetById,
    postsCreatePostController,

}