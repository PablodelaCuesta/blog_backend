const { request, response } = require('express');
const { CreatePost,GetAll,DeletePost,UpdatePost, GetById } = require('../../Infrastructure/Repositories/PostRepository');

const postsGetAllController = async (req = request, res = response) => {

    const options = req.query
    // const { page = 1, limit = 6 } = req.query
    // const from = (Number( page ) - 1) * 5

    const resp = await GetAll(options)

    res.json({
        ...resp
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