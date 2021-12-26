const Category = require('../../Core/Entities/Category')

const CreateCategory = async ( categoryName ) => {
    const newCategory = new Category({
        name: categoryName
    })

    await newCategory.save()

    return newCategory
}

const GetCategory = async (id) => {
    return await Category.findById(id)
}

const GetAllCategories = async () => {
    const query = { state: true }
    return await Category.find(query)
}

// TODO: must to be implemented
const UpdateCategory = async ( id, categoryModified ) => {
    return await Category.findByIdAndUpdate(id, {...categoryModified})
}

const DeleteCategory = async ( id ) => {
    return await Category.findByIdAndUpdate(id, { state: false });
}


module.exports = {
    CreateCategory,
    GetCategory,
    GetAllCategories,
    UpdateCategory,
    DeleteCategory
}