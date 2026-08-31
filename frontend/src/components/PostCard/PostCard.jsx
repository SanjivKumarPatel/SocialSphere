import { useContext, useState } from 'react'

import api from '../../services/api.js'
import { AuthContext } from '../../context/AuthContext.jsx'
import CommentSection from '../CommentSection/CommentSection.jsx'

import './PostCard.css'

const PostCard = ({post, onPostUpdated, onCommentAdded}) => {
  const [loading, setLoading] = useState(false)

  const {user} = useContext(AuthContext)

  const handleLike = async () => {
    try {
      setLoading(true)

      const token = localStorage.getItem('token')

      await api.put(
        `/posts/${post._id}/like`,
        {},
        {
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      )

      if(onPostUpdated){
        onPostUpdated(post._id, user._id)
      }
    } catch (error) {
      console.error('Like post error:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const isLiked = post.likes.some((like) => {
    return like._id === user?._id
  })

  return (
    <div className='post-card'>
      <div className='post-header'>
        <strong>{post.user.username}</strong>
      </div>

      {post.content && (
        <p className='post-content'>{post.content}</p>
      )}

      {post.image && (
        <img
          src={post.image}
          alt='Post'
          className='post-image'
        />
      )}

      <div className='post-actions'>
        <button onClick={handleLike} disabled={loading}>
          {isLiked ? 'Unlike' : 'Like'}
        </button>
          <span>{post.likes.length} likes</span>
          <span>{post.comments.length} Comments</span>
      </div>

      <CommentSection
        post={post}
        onCommentAdded={onCommentAdded}
      />
    </div>
  )
}

export default PostCard