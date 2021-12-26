const { request, response } = require('express')
const { GetCategory, GetAllCategories, CreateCategory, UpdateCategory, DeleteCategory } = require('../../Infrastructure/Repositories/CategoryRepository')

const categoryGetByID = async ( req = request, res = response ) => {
    const { id } = req.params
    const resp = await GetCategory( id )

    return res.status(200).json({
        msg: "GetById",
        resp
    })
}

const categoryGetAll = async ( req = request, res = response ) => {
    const resp = await GetAllCategories()

    return res.status(200).json({
        msg: "success",
        resp
    })
}

const categoryCreate = async (req = request, res = response ) => {
    const { name } = req.body
    const resp = await CreateCategory( name )

    res.status(200).json({
        msg: "success",
        resp
    })
}

const categoryUpdate = async ( req = request, res = response) => {
    const { name, id } = req.body
    const resp = await UpdateCategory(id, name)

    res.status(200).json({
        msg: "success",
        resp
    })
}

const categoryDelete = async ( req = request, res = response) => {
    const { id } = req.params
    const resp = await DeleteCategory(id)

    res.status(200).json({
        msg: "success",
        resp
    })
}

module.exports = {
    categoryCreate,
    categoryGetByID,
    categoryGetAll,
    categoryUpdate,
    categoryDelete
}