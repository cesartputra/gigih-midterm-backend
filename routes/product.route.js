const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth')
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
router.post('/', authMiddleware, addProduct)
router.put('/:id', authMiddleware, updateProduct)
router.delete('/:id', authMiddleware, deleteProduct)

module.exports = router