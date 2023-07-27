const mongoose = require('mongoose')
const {
    registerUser,
    loginUser
} = require('../services/auth.service')

exports.registerUser = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const registerUserData = req.body
        const userToSave = await registerUser(registerUserData)

        await session.commitTransaction();
        session.endSession();

        res.json({
            status: 'success',
            data: {
                userToSave
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error('Error registering user: ', error)
        res.status(500).json({
            error: 'error registering user'
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const loginUserData = req.body
        const userToLogin = await loginUser(loginUserData)
        if (!userToLogin) {
            return res.status(404).json({
                status: 'failed',
                message: 'invalid username or password'
            })
        }

        res.json({
            status: 'success',
            data: {
                userToLogin
            }
        })
    } catch (error) {
        console.error('Error login user: ', error)
        res.status(500).json({
            error: 'error login user'
        })
    }
}