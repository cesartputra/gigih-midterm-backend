const {
    getAllUsers
} = require('../services/user.service')

exports.getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers()
        if(!users || users.length === 0){
            return res.status(404).json({
                status: 'failed',
                message: 'users not found'
            })
        }

        res.json({
            status: 'success',
            data: {
                users
            }
        })
    } catch (error) {
        console.error('Error getting video by ID: ', error)
        res.status(500).json({
            error: 'error getting video by ID'
        })
    }
}