const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = Schema({
    title: {
        type: String,
        required: [true, 'title is mandatory']
    },
    overview: {
        type: String,
        required: [true, 'overview is mandatory'],
        unique: true
    },
    content: {
        type: String,
        required: [true, 'The content is mandatory'],
    },
    categories: [
        {
            type: Schema.Types.Mixed,
            ref: 'Category'
        },
    ],
    state: {
        type: Boolean,
        default: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

PostSchema.methods.toJSON = function() {
    const { __v, _id, ...post  } = this.toObject();
    post.uid = _id
    return post;
}

PostSchema.plugin( mongoosePaginate )

module.exports = model( 'Post', PostSchema );
