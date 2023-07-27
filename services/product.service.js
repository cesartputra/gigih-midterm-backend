const Product = require('../models/product.model')
const mongoose = require('mongoose')

exports.getProductList = async () => {
    const products = await Product.find()

    return products
}

exports.getProductById = async (productId) => {
    const product = await Product.findById(productId)

    return product
}

exports.getProductsByVideoId = async (videoId) => {
    const products = await Product.find({ videoId: videoId })

    return products
}

exports.addProduct = async (productData) => {
    const newProduct = new Product({
        title: productData.title,
        description: productData.description,
        price: productData.price,
        videoId: productData.videoId,
        productUrl: productData.productUrl,
        createdAt: Date.now(),
        updatedAt: Date.now()
    })

    const productToSave = await newProduct.save()

    return productToSave
}

exports.updateProduct = async (productId, productData) => {
    const option = { new: true }
    const updatedProduct = {
        title: productData.title,
        description: productData.description,
        price: productData.price,
        videoId: productData.videoId,
        productUrl: productData.productUrl,
        updatedAt: Date.now()
    }

    const productToUpdate = await Product.findByIdAndUpdate(productId, updatedProduct, option)

    return productToUpdate
}

exports.deleteProduct = async (productId) => {

    const productToDelete = await Product.findByIdAndDelete(productId)

    return productToDelete
}