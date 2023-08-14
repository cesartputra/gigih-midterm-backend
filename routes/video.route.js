const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth')
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
router.post('/', authMiddleware, addVideo)
router.put('/:id', authMiddleware, updateVideo)
router.delete('/:id', authMiddleware, deleteVideo)

module.exports = router