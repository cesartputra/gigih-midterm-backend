const express = require('express')
const router = express.Router()
const {
    getVideoThumbnailList,
    // getVideoWithCommentsWithUser,
    getVideoById,
    addVideo,
    updateVideo,
    deleteVideo
} = require('../controllers/video.controller')

router.get('/', getVideoThumbnailList)
router.get('/:id', getVideoById)
// router.get('/:id', getVideoWithCommentsWithUser)
router.post('/', addVideo)
router.put('/:id', updateVideo)
router.delete('/:id', deleteVideo)

module.exports = router