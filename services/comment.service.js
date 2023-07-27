const Comment = require('../models/comment.model')

exports.getCommentsByVideoId = async () => {
    const pipeline = [
        {
            $lookup: {
                from: 'videos',
                localField: 'videoId',
                foreignField: '_id',
                as: 'video',
            }
        }
    ]

    const comments = await Comment.aggregate(pipeline)

    return comments
}

exports.addComment = async (commentData) => {
    const newComment = new Comment({
        content: commentData.content,
        userId: commentData.userId,
        videoId: commentData.videoId,
        createdAt: Date.now(),
        updatedAt: Date.now()
    })

    const commentToSave = await newComment.save()

    return commentToSave
}

exports.updateComment = async (commentId, commentData) => {
    const option = {new: true}

    const updatedComment = {
        content: commentData.content,
        userId: commentData.userId,
        videoId: commentData.videoId,
        updatedAt: Date.now()
    }

    const commentToUpdate = await Comment.findByIdAndUpdate(commentId, updatedComment, option)

    return commentToUpdate
}

exports.deleteComment = async (commentId) => {
    const commentToDelete = await Comment.findByIdAndDelete(commentId)

    return commentToDelete
}