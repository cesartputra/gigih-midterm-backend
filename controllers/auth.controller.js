const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;
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

        const token = jwt.sign({ userId: userToSave._id }, SECRET_KEY, { expiresIn: '1h' });

        await session.commitTransaction();
        session.endSession();

        res.json({
            status: 'success',
            data: {
                userToSave,
                token
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

        const token = jwt.sign({ userId: userToLogin._id }, SECRET_KEY, { expiresIn: '1h' });

        res.json({
            status: 'success',
            data: {
                userToLogin,
                token
            }
        })
    } catch (error) {
        console.error('Error login user: ', error)
        res.status(500).json({
            error: 'error login user'
        })
    }
}