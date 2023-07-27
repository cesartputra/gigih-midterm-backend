const mongoose = require('mongoose')
const {
    getProductList,
    getProductById,
    getProductsByVideoId,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../services/product.service')

exports.getProductList = async (req, res) => {
    try {
        const products = await getProductList()

        if(!products || products.length === 0){
            return res.status(404).json({
                status: 'failed',
                message: 'products not found'
            })
        }

        res.json({
            status: 'success',
            data: {
                products
            }
        })
    } catch (error) {
        console.error('Error getting products: ', error)
        res.status(500).json({
            error: 'error getting products'
        })
    }
}

exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id
        const product = await getProductById(productId)

        if(!product){
            return res.status(404).json({
                status: 'failed',
                message: 'product not found'
            })
        }

        res.json({
            status: 'success',
            data: {
                product
            }
        })
    } catch (error) {
        console.error('Error getting product by id: ', error)
        res.status(500).json({
            error: 'error getting product by id'
        })
    }
}

exports.getProductsByVideoId = async (req, res) => {
    try {
        const videoId =  req.query.videoId
        const products = await getProductsByVideoId(videoId)

        if(!products || products.length === 0){
            return res.status(404).json({
                status: 'failed',
                message: 'products not found'
            })
        }

        res.json({
            status: 'success',
            data: {
                products
            }
        })
    } catch (error) {
        console.error('Error getting products by video id: ', error)
        res.status(500).json({
            error: 'error getting products by video id'
        })
    }
}

exports.addProduct = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const productData = req.body
        const productToSave = await addProduct(productData)

        await session.commitTransaction();
        session.endSession();

        res.json({
            status: 'success',
            data: {
                productToSave
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error('Error adding product: ', error)
        res.status(500).json({
            error: 'error adding product '
        })
    }
}

exports.updateProduct = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const productData = req.body
        const productId = req.params.id

        const productToUpdate = await updateProduct(productId, productData)

        if(!productToUpdate){
            return res.status(404).json({
                status: 'failed',
                message: 'product not found'
            })
        }

        await session.commitTransaction();
        session.endSession();

        res.json({
            status: 'success',
            data: {
                productToUpdate
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error('Error updating product: ', error)
        res.status(500).json({
            error: 'error updating product '
        })
    }
}

exports.deleteProduct = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const productId = req.params.id
        const productToDelete = await deleteProduct(productId)

        if(!productToDelete){
            return res.status(404).json({
                status: 'failed',
                message: 'product not found'
            })
        }

        await session.commitTransaction();
        session.endSession();

        res.json({
            status: 'success',
            data: {
                productToDelete
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error('Error deleting product: ', error)
        res.status(500).json({
            error: 'error deleting product '
        })
    }
}