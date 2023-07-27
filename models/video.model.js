const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    videoUrl: {
        required: true,
        type: String
    },
    thumbnailUrl: {
        required: true,
        type: String
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

module.exports = mongoose.model("Video", videoSchema)