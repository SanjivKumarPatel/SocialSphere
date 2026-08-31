import Post from '../models/Post.js'

/**
 * @desc Creates a new post
 * @route POST /api/posts
 * @access Private
 */

export const createPost = async (req, res) => {
  try {
    const {content} = req.body

    if(!content){
      return res.status(400).json({
        success : false,
        message : 'Post content is required'
      })
    }

    const post = await Post.create({
      user : req.user._id,
      content
    })

    const populatedPost = await post.populate('user', 'username')

    res.status(201).json({
      success : true,
      message : 'Post created successfully',
      post : populatedPost
    })
  } catch (error) {
    console.error('Create post error:', error.message)

    res.status(500).json({
      success : false,
      message : 'Internal server error'
    })
  }
}

/**
 * @desc Gets all posts for the public feed
 * @route GET /api/posts
 * @access Public
 */

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username')
      .populate('likes', 'username')
      .populate('comments.user', 'username')
      .sort({createdAt : -1})

    res.status(200).json({
      success : true,
      posts
    })
  } catch (error) {
    console.error('Get posts error:', error.message)

    res.status(500).json({
      success : false,
      message : 'Internal server error'
    })
  }
}

/**
 * @desc Likes or unlikes a post
 * @route PUT /api/posts/:id/like
 * @access Private
 */

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if(!post){
      return res.status(404).json({
        success : false,
        message : 'Post not found'
      })
    }

    const alreadyLiked = post.likes.includes(req.user._id)

    if(alreadyLiked){
      post.likes.pull(req.user._id)
    } else {
      post.likes.push(req.user._id)
    }

    await post.save()

    res.status(200).json({
      success : true,
      message : alreadyLiked ? 'Post unliked successfully' : 'Post liked successfully',
      likes : post.likes.length
    })
  } catch (error) {
    console.error('Like post error:', error.message)

    res.status(500).json({
      success : false,
      message : 'Internal server error'
    })
  }
}

/**
 * @desc Adds a comment to a post
 * @route POST /api/posts/:id/comment
 * @access Private
 */

export const addComment = async (req, res) => {
  try {
    const {content} = req.body

    if(!content){
      return res.status(400).json({
        success : false,
        message : 'Comment content is required'
      })
    }

    const post = await Post.findById(req.params.id)

    if(!post){
      return res.status(404).json({
        success : false,
        message : 'Post not found'
      })
    }

    post.comments.push({
      user : req.user._id,
      content
    })

    await post.save()

    const populatedPost = await post.populate('comments.user', 'username')

    const newComment = populatedPost.comments[populatedPost.comments.length - 1]

    res.status(201).json({
      success : true,
      message : 'Comment added successfully',
      comment : newComment,
      commentsCount : post.comments.length
    })
  } catch (error) {
    console.error('Add comment error:', error.message)

    res.status(500).json({
      success : false,
      message : 'Internal server error'
    })
  }
}