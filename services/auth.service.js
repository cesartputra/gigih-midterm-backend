const User = require('../models/user.model')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

async function encryptPassword(plainPassword){
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hashSync(plainPassword, saltRounds)

    return encryptedPassword
}

async function checkPassword(plainPassword, storedPassword){
    const check = await bcrypt.compare(plainPassword, storedPassword)

    return check
}

exports.registerUser = async (userData) => {
    const encryptedPassword = await encryptPassword(userData.password)
    
    const newUser = new User({
        username: userData.username,
        password: encryptedPassword,
        avatar: userData.avatar
    })

    const userToSave = await newUser.save()

    return userToSave
}

exports.loginUser = async (loginData) => {
    
    const user = await User.findOne({ username: loginData.username })

    if(!user){
        return null
    }

    const passwordCheck = await checkPassword(loginData.password, user.password)
    
    if(!passwordCheck){
        return null
    }

    return {
        id: user._id,
        username: user.username,
        avatar: user.avatar
    };
}