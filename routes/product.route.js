const express = require('express')
const router = express.Router()

const {
    getProductList,
    getProductById,
    getProductsByVideoId,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product.controller')

router.get('/', getProductList)
router.get('/list', getProductsByVideoId)
router.get('/:id', getProductById)
router.post('/', addProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router