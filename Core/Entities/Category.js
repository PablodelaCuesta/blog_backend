const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory']
    },
    state: {
        type: String,
        default: true
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});



CategorySchema.methods.toJSON = function() {
    const { __v, _id, ...category  } = this.toObject();
    category.uid = _id
    return category;
}

module.exports = model( 'Category', CategorySchema );
