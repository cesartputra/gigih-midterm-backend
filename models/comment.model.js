const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        required: true,
        type: String
    },
    userId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    videoId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    createdAt: {
        required: true,
        type: Date
    },
    updatedAt: {
        required: true,
        type: Date
    }
})

module.exports = mongoose.model("Comment", commentSchema)