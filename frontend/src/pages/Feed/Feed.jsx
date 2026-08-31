import { useEffect, useState } from 'react'

import api from '../../services/api.js'

import Navbar from '../../components/Navbar/Navbar.jsx'
import CreatePost from '../../components/CreatePost/CreatePost.jsx'
import PostCard from '../../components/PostCard/PostCard.jsx'

import './Feed.css'

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const getPosts = async () => {
    try {
      setLoading(true)

      const response = await api.get('/posts')

      setPosts(response.data.posts)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  const handlePostCreated = (newPost) => {
    setPosts((previousPosts) => [
      newPost,
      ...previousPosts
    ])
  }

  const handlePostUpdated = (postId, userId) => {
    setPosts((previousPosts) =>
      previousPosts.map((post) => {
        if(post._id === postId){
          const alreadyLiked = post.likes.some((like) => {
            return like._id === userId
          })

          return {
            ...post,
            likes : alreadyLiked
              ? post.likes.filter((like) => like._id !== userId)
              : [...post.likes, {_id : userId}]
          }
        }

        return post
      })
    )
  }

  const handleCommentAdded = (postId, newComment) => {
    setPosts((previousPosts) =>
      previousPosts.map((post) => {
        if(post._id === postId){
          return {
            ...post,
            comments : [...post.comments, newComment]
          }
        }

        return post
      })
    )
  }

  return (
    <div className='feed-page'>
      <Navbar />

      <main className='feed-container'>
        <CreatePost onPostCreated={handlePostCreated} />

        {loading && <p>Loading posts...</p>}

        {message && <p className='error-message'>{message}</p>}

        {!loading && posts.length === 0 && (
          <p>No posts yet. Be the first to post!</p>
        )}

        <div className='posts-list'>
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onPostUpdated={handlePostUpdated}
              onCommentAdded={handleCommentAdded}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Feed