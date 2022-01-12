const { v4: uuidv4 } = require('uuid')
const path = require('path')

const uploadOneFile = async ( files, folder = '' ) => {
    return await new Promise( (resolve, reject ) => {

        if (!files || Object.keys(files).length === 0) return reject('No files were uploaded.');

        // TODO: Refactor to make more simple
        const { image } = files;
        const { name } = image;
        const splitName = name.split('.')
        const tmpName = splitName[0] + uuidv4() + '.' + splitName[1]
        const uploadPath = path.join( __dirname, '../uploads/', folder, tmpName)

        image.mv(uploadPath, (err) => {

            if (err) reject( err )
            resolve ( tmpName )
        })

    })
}

module.exports = {
    uploadOneFile
}