const {
    getVideoThumbnailList,
    getVideoWithCommentsWithUser,
    addVideo,
    updateVideo,
    deleteVideo
} = require('../services/video.service')

exports.getVideoThumbnailList = async (req, res) => {
    try {
        const videos = await getVideoThumbnailList()

        if (!videos || videos.length === 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'videos not found'
            })
        } else {
            
        }

        res.json({
            status: 'success',
            data: {
                videos
            }
        })
    } catch (error) {
        console.error('Error getting videos: ', error)
        res.status(500).json({
            error: 'error getting videos'
        })
    }
}

exports.getVideoWithCommentsWithUser = async (req, res) => {
    try {
        const current = parseInt(req.query.current)
        const size = parseInt(req.query.size)
        const videoId = req.params.id

        const video = await getVideoWithCommentsWithUser(videoId, current, size)

        if (!video) {
            return res.status(404).json({
                status: 'failed',
                message: 'video not found'
            })
        }
        
        res.json({
            status: 'success',
            data: {
                video
            }
        })
    } catch (error) {
        console.error('Error getting video by ID: ', error)
        res.status(500).json({
            error: 'error getting video by ID'
        })
    }
}

// exports.getVideoById = async (req, res) => {
//     try {
//         const videoId = req.params.id
//         const video = await getVideoById(videoId)

//         if (!video) {
//             res.status(404).json({
//                 status: 'failed',
//                 message: 'video not found'
//             })
//         }
        
//         res.json({
//             status: 'success',
//             data: {
//                 video
//             }
//         })
//     } catch (error) {
//         console.error('Error getting video by ID: ', error)
//         res.status(500).json({
//             error: 'error getting video by ID'
//         })
//     }
// }

exports.addVideo = async (req, res) => {
    try {
        const videoData = req.body
        const videoToSave = await addVideo(videoData)
        
        res.json({
            status: 'success',
            data: {
                videoToSave
            }
        })
    } catch (error) {
        console.error('Error adding video: ', error)
        res.status(500).json({
            error: 'error adding video'
        })
    }
}

exports.updateVideo = async (req, res) => {
    try {
        const videoData = req.body
        const videoId = req.params.id

        const videoToUpdate = await updateVideo(videoId, videoData)
        
        if (!videoToUpdate) {
            return res.status(404).json({
                status: 'failed',
                message: 'video not found'
            })
        }
        
        res.json({
            status: 'success',
            data: {
                videoToUpdate
            }
        })
    } catch (error) {
        console.error('Error updating video: ', error)
        res.status(500).json({
            error: 'error updating video'
        })
    }
}

exports.deleteVideo = async (req, res) => {
    try {
        const videoId = req.params.id
        const videoToDelete = await deleteVideo(videoId)

        if (!videoToDelete) {
            return res.status(404).json({
                status: 'failed',
                message: 'video not found'
            })
        }
        
        res.json({
            status: 'success',
            data: {
                videoToDelete
            }
        })
    } catch (error) {
        console.error('Error deleting video: ', error)
        res.status(500).json({
            error: 'error deleting video'
        })
    }
}