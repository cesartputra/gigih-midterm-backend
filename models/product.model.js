const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    videoId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    productUrl: {
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

module.exports = mongoose.model("Product", productSchema)