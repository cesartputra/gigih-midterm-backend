const Product = require('../models/product.model')
const Video = require('../models/video.model')

exports.searchProducts = async (searchQuery) => {
    const query = String(searchQuery)
    const products = await Product.find({ title: { $regex: query, $options: 'i' } })
    return products
}

exports.searchVideos = async (searchQuery) => {
    const query = String(searchQuery)
    const videos = await Video.find({ title: { $regex: query, $options: 'i' } })
    
    return videos
}