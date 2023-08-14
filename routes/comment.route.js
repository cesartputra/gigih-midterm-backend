const express = require('express')
const router = express.Router()
const {
    addComment,
    getCommentsByVideoId,
    updateComment,
    deleteComment
} = require('../controllers/comment.controller')

router.post('/', addComment)
router.get('/', getCommentsByVideoId)
router.put('/:id', updateComment)
router.delete('/:id', deleteComment)

module.exports = router