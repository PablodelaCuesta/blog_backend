const fs = require('fs')

// TODO: DELETE all useless imports
const { request, response } = require('express');

const { CreatePost, GetAll, DeletePost, UpdatePost, GetById } = require('../../Infrastructure/Repositories/PostRepository');
const { uploadOneFile } = require('../../Infrastructure/Service/uploadFiles');
const pathToUploadFolder = require('../../Infrastructure/uploads');

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

    const post = await CreatePost({ title, overview, content, categories, state })

    res.json({
        msg: "success",
        post
    })
}


// Images managed
const postsUploadImage = async (req = request, res = response) => {    

    try {
        const name = await uploadOneFile( req.files, 'Posts' )
        res.json({
            msg: 'success',
            name
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ error })
    }
}

const postsShowImage = async ( req = request, res = response) => {

    const { folder = '', id } = req.params;

    if ( id ) {
        const pathImagen = pathToUploadFolder + '/' + folder + '/' + id;

        if ( fs.existsSync( pathImagen ) ) return res.sendFile( pathImagen )
    }

    // TODO: Default image
    // const pathImagen = path.join( __dirname, '../assets/no-image.jpg');
    res.status(400).send( 'Image not found' );
}

module.exports = {
    postsGetAllController,
    postsGetById,
    postsCreatePostController,

    postsUploadImage,
    postsShowImage,

}