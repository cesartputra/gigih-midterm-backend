const express = require('express')
const router = express.Router()
const {
    addComment,
    updateComment,
    deleteComment
} = require('../controllers/comment.controller')

router.post('/', addComment)
router.put('/:id', updateComment)
router.delete('/:id', deleteComment)

module.exports = router