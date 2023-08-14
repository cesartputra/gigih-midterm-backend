const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth')
const {
    addComment,
    getCommentsByVideoId,
    updateComment,
    deleteComment
} = require('../controllers/comment.controller')

router.post('/', authMiddleware, addComment)
router.get('/', getCommentsByVideoId)
router.put('/:id', authMiddleware, updateComment)
router.delete('/:id', authMiddleware, deleteComment)

module.exports = router