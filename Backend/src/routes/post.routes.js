const express = require("express")
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})
const identifyUser = require('../middlewares/auth.middleware')

/**
 * @route POST /posts
 * @desc Create a new post
 */
postRouter.post('/', upload.single("image"), identifyUser, postController.createPostController)

/**
 * @route GET /posts
 * @desc Get all posts
 */

postRouter.get('/', identifyUser, postController.getAllPostsController)

/**
 * @route GET /posts/details/:postId
 * @desc Get details of a specific post by ID
 */

postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController)

/**
 * @route Post /api/posts/like/:postid
 * @desc like a post with the id provided in the request params
 */

postRouter.post('/like/:postId', identifyUser, postController.likePostController)
postRouter.post('/unlike/:postId', identifyUser, postController.unlikePostController)

/**
 * @route Get /api/posts/feed
 * @desc Get the feed of posts for the authenticated user
 * @access Private
 */
postRouter.get('/feed', identifyUser, postController.getFeedController)

module.exports = postRouter