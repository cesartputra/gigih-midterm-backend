const mongoose = require('mongoose')
const {
    getCommentListWithVideo,
    addComment,
    updateComment,
    deleteComment
} = require('../services/comment.service')

exports.getCommentListWithVideo = async (req, res) => {
    try {
        const comments = await getCommentListWithVideo()

        if(!comments){
            return res.status(404).json({
                status: 'failed',
                message: 'products not found'
            })
        }

        res.json({
            status: 'success',
            data: {
                comments
            }
        })
    } catch (error) {
        console.error('Error getting comments with video: ', error)
        res.status(500).json({
            error: 'error getting comments with video'
        })
    }
}

exports.addComment = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const commentData = req.body
        const commentToSave = await addComment(commentData)
        
        await session.commitTransaction();
        session.endSession();

        res.json({
            status: 'success',
            data: {
                commentToSave
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error('Error adding comment: ', error)
        res.status(500).json({
            error: 'error adding comment'
        })
    }
}

exports.updateComment = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const commentData = req.body
        const commentId = req.params.id

        const commentToUpdate = await updateComment(commentId, commentData)
        
        if (!commentToUpdate) {
            return res.status(404).json({
                status: 'failed',
                message: 'comment not found'
            })
        }

        await session.commitTransaction();
        session.endSession();
        
        res.json({
            status: 'success',
            data: {
                commentToUpdate
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error('Error updating comment: ', error)
        res.status(500).json({
            error: 'error updating comment'
        })
    }
}

exports.deleteComment = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const commentId = req.params.id
        
        const commentToDelete = await deleteComment(commentId)

        if (!commentToDelete) {
            return res.status(404).json({
                status: 'failed',
                message: 'comment not found'
            })
        }

        await session.commitTransaction();
        session.endSession();
        
        res.json({
            status: 'success',
            data: {
                commentToDelete
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error('Error deleting comment: ', error)
        res.status(500).json({
            error: 'error deleting comment'
        })
    }
}