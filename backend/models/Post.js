import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({

  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },

  content : {
    type : String,
    trim : true,
    default : ''
  },

  image : {
    type : String,
    default : ''
  },

  likes : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
    }
  ],

  comments : [
    {
      user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
      },

      content : {
        type : String,
        required : true,
        trim : true
      }
    }
  ]

}, {timestamps : true})

const Post = mongoose.model('Post', postSchema)

export default Post