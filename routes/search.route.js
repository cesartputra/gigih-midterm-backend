const express = require('express')
const router = express.Router()

const {
    searchProductsAndVideos
} = require('../controllers/search.controller')

router.get('/', searchProductsAndVideos)

module.exports = router