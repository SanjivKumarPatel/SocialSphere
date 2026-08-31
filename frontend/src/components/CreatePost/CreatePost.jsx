import { useState } from 'react'

import api from '../../services/api.js'

import './CreatePost.css'

const CreatePost = ({onPostCreated}) => {
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!content.trim() && !image){
      setMessage('Please add post content or an image')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const token = localStorage.getItem('token')

      const formData = new FormData()

      formData.append('content', content)

      if(image){
        formData.append('image', image)
      }

      const response = await api.post(
        '/posts',
        formData,
        {
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      )

      setContent('')
      setImage(null)

      if(onPostCreated){
        onPostCreated(response.data.post)
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]

    if(selectedImage){
      setImage(selectedImage)
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

        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
        />

        {image && (
          <p className='selected-image'>
            Selected: {image.name}
          </p>
        )}

        {message && <p className='error-message'>{message}</p>}

        <button
          type='submit'
          disabled={loading || (!content.trim() && !image)}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  )
}

export default CreatePost