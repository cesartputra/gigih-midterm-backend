const {
    searchProducts,
    searchVideos
} = require('../services/search.service')

exports.searchProductsAndVideos = async (req, res) => {   
    try {
        const searchQuery = req.query.q

        const products = await searchProducts(searchQuery)
        const videos = await searchVideos(searchQuery)

        if((!products || products.length === 0) && (!videos || videos.length === 0)){
            return res.status(404).json({
                status: 'failed',
                message: 'search not found'
            })
        }

        res.json({
            status: 'success',
            data: {
                products,
                videos
            }
        })
    } catch (error) {
        console.error('Error getting search: ', error)
        res.status(500).json({
            error: 'error getting search'
        })
    }
}