import { useState } from 'react'

import api from '../../services/api.js'

import './CommentSection.css'

const CommentSection = ({post, onCommentAdded}) => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!content.trim()){
      return
    }

    try {
      setLoading(true)

      const token = localStorage.getItem('token')

      const response = await api.post(
        `/posts/${post._id}/comment`,
        {
          content
        },
        {
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      )

      setContent('')

      if(onCommentAdded){
        onCommentAdded(post._id, response.data.comment)
      }
    } catch (error) {
      console.error('Add comment error:', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='comment-section'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Write a comment...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type='submit' disabled={loading || !content.trim()}>
          {loading ? 'Adding...' : 'Comment'}
        </button>
      </form>

      <div className='comments-list'>
        {post.comments.map((comment) => (
          <div className='comment' key={comment._id}>
            <strong>{comment.user.username}</strong>

            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentSection