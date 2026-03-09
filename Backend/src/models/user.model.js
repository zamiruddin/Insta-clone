const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'User name Already Exists'],
        required: [true, "user name is required"]
    },

    email: {
        type: String,
        unique: [true, 'Email Already Exists'],
        required: [true, "Email is required"]
    },

    password: {
        type: String,
        required: [true, 'Pasword is required'],
        select: false
    },

    bio: String,

    profileImage:{
        type: String,
        default: "https://ik.imagekit.io/g2oj2qe4s/profile-image.avif"
    },

    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],

    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]


})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel