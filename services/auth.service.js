const User = require('../models/user.model')

const bcrypt = require('bcrypt');
const mongoose = require('mongoose')

async function encryptPassword(plainPassword){
    const saltRounds = 10;
    const encryptedPassword = bcrypt.hashSync(plainPassword, saltRounds)

    return encryptedPassword
}

async function checkPassword(plainPassword, storedPassword){
    
    // const hash = await encryptPassword(plainPassword)
    // const hash2 = await encryptPassword('Cesar123')
    // console.log(hash)
    // console.log(hash2)
    const check =  bcrypt.compare(plainPassword, storedPassword)

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
        return
    }

    const passwordCheck = await checkPassword(loginData.password, user.password)
    
    if(!passwordCheck){
        return
    }

    return user
}