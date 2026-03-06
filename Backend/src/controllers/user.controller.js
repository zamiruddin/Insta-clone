const followerModel = require('../models/follow.model');
const userModel = require('../models/user.model');

async function followUserController(req, res) {

    const followerUsername = req.user.username
    const followingUsername = req.params.username

    if (followerUsername === followingUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    const isFollowingExists = await userModel.findOne({
        username: followingUsername
    })

    if (!isFollowingExists) {
        return res.status(404).json({
            message: "User you are trying to follow does not exist"
        })
    }

    const existingFollow = await followerModel.findOne({
        follower: followerUsername,
        following: followingUsername
    })

    if (existingFollow) {
        return res.status(200).json({
            message: `You are already following ${followingUsername}`,
            follow: existingFollow
        })
    }

    const followRecord = await followerModel.create({
        follower: followerUsername,
        following: followingUsername
    })

    res.status(201).json({
        message: `You are now following ${followingUsername}`,
        follow: followRecord
    })
}

async function unfollowUserController(req, res) {

    const followerUsername = req.user.username
    const followingUsername = req.params.username

    const existingFollow = await followerModel.findOne({
        follower: followerUsername,
        following: followingUsername
    })

    if (!existingFollow) {
        return res.status(200).json({
            message: `You are not following ${followingUsername}`
        })
    }

    await followerModel.findByIdAndDelete(existingFollow._id)

    res.status(200).json({
        message: `You have unfollowed ${followingUsername}`
    })
}

module.exports = {
    followUserController,
    unfollowUserController
}


