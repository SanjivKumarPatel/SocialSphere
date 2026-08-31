import { useState } from 'react'

import api from '../../services/api.js'

import './CreatePost.css'

const CreatePost = ({onPostCreated}) => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!content.trim()){
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const token = localStorage.getItem('token')

      const response = await api.post(
        '/posts',
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

      if(onPostCreated){
        onPostCreated(response.data.post)
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='create-post'>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder='What is on your mind?'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows='4'
        />

        {message && <p className='error-message'>{message}</p>}

        <button type='submit' disabled={loading || !content.trim()}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  )
}

export default CreatePost