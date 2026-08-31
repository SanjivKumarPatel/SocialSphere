import express from 'express'

import {
  createPost,
  getPosts,
  likePost,
  addComment
} from '../controllers/postController.js'

import authMiddleware from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'

const postRouter = express.Router()

/**
 * @desc Gets all posts for the public feed
 * @route GET /api/posts
 * @access Public
 */

postRouter.get('/', getPosts)

/**
 * @desc Creates a new post
 * @route POST /api/posts
 * @access Private
 */

postRouter.post('/', authMiddleware, upload.single('image'), createPost)

/**
 * @desc Likes or unlikes a post
 * @route PUT /api/posts/:id/like
 * @access Private
 */

postRouter.put('/:id/like', authMiddleware, likePost)

/**
 * @desc Adds a comment to a post
 * @route POST /api/posts/:id/comment
 * @access Private
 */

postRouter.post('/:id/comment', authMiddleware, addComment)

export default postRouter