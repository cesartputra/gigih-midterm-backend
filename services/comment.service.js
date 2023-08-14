const { mongoose } = require('mongoose');
const Comment = require('../models/comment.model')

exports.getCommentsByVideoId = async (videoId) => {
    const pipeline = [
        {
            $match: {
                videoId: new mongoose.Types.ObjectId(videoId) // Convert videoId to ObjectId
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user' // Unwind the user array created by the $lookup stage
        },
        {
            $project: {
                _id: 1,
                content: 1,
                userId: 1,
                videoId: 1,
                createdAt: 1,
                updatedAt: 1,
                'user._id': 1,
                'user.username': 1,
                'user.avatar': 1
            }
        }
    ]
    const comments = await Comment.aggregate(pipeline)
    // const comments = await Comment.find({ videoId: videoId })
    // console.log(comments);
    return comments
}
// exports.getCommentsByVideoId = async () => {
//     const pipeline = [
//         {
//             $lookup: {
//                 from: 'videos',
//                 localField: 'videoId',
//                 foreignField: '_id',
//                 as: 'video',
//             }
//         }
//     ]

//     const comments = await Comment.aggregate(pipeline)

//     return comments
// }

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