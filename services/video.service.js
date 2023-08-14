const Video = require('../models/video.model')
const mongoose = require('mongoose')

exports.getVideoThumbnailList = async () => {
    const videos = await Video.find()

    return videos
}

// exports.getVideoWithCommentsWithUser = async (videoId, current, size) => {
//     const pipeline = [
//         { $match: { _id: new mongoose.Types.ObjectId(videoId) } },
//         {
//             $lookup: {
//                 from: 'comments',
//                 let: {
//                     videoId: '$_id',
//                 },
//                 localField: '_id',
//                 foreignField: 'videoId',
//                 as: 'comments',
//                 pipeline: [
//                     // { $match: { _id: { $eq: ["$$userId", "$comments._id"]} } },
//                     { $match: { $expr: { $eq: ["$videoId", "$$videoId"] } } },
//                     {
//                         $lookup: {
//                             from: 'users',
//                             localField: 'userId',
//                             foreignField: '_id',
//                             as: 'user',
//                         }
//                     },
//                 ]
//             }
//         },
//         {
//             $project: {
//                 _id: 1,
//                 title: 1,
//                 description: 1,
//                 videoUrl: 1,
//                 thumbnailUrl: 1,
//                 createdAt: 1,
//                 updatedAt: 1,
//                 comments: {
//                     _id: 1,
//                     content: 1,
//                     createdAt: 1,
//                     updatedAt: 1,
//                     user: {
//                         _id: 1,
//                         username: 1
//                     },
//                 },
//             },
//         },
//         {
//             $skip: (current - 1) * size
//         },
//         {
//             $limit: size
//         }
//     ]
    
//     const video = await Video.aggregate(pipeline)

//     return video
// }

exports.getVideoById = async (videoId) => {
    const video = await Video.findById(videoId)

    return video
}

exports.addVideo = async (videoData) => {
    const newVideo = new Video({
        title: videoData.title,
        description: videoData.description,
        videoUrl: videoData.videoUrl,
        thumbnailUrl: videoData.thumbnailUrl,
        createdAt: Date.now(),
        updatedAt: Date.now()
    })

    const videoToSave = await newVideo.save()

    return videoToSave
}

exports.updateVideo = async (videoId, videoData) => {
    const option = {new: true}

    const updatedVideo = {
        title: videoData.title,
        description: videoData.description,
        videoUrl: videoData.videoUrl,
        thumbnailUrl: videoData.thumbnailUrl,
        updatedAt: Date.now()
    }

    const videoToUpdate = await Video.findByIdAndUpdate(videoId, updatedVideo, option)

    return videoToUpdate
}

exports.deleteVideo = async (videoId) => {
    const videoToDelete = await Video.findByIdAndDelete(videoId)

    return videoToDelete
}