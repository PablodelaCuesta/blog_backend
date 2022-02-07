const uploadImage = async (req = request, res = response) => {    

    try {
        const name = await uploadOneFile( req.files )
        res.json({
            msg: 'success',
            name
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ error })
    }
}

const showImage = async ( req = request, res = response) => {
    
}

const deleteImage = async ( req = request, res = response) => {
    
}

module.exports = {
    uploadImage,
    showImage,
    deleteImage
}