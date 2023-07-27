const User = require('../models/user.model')
const mongoose = require('mongoose')

exports.getAllUsers = async () => {
    const pipeline = [
        {
            $project: {
                _id: 1,
                username: 1
            }
        }
    ]
    const users = await User.aggregate(pipeline)

    return users
}