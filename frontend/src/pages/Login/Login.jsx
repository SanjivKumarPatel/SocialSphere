import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import api from '../../services/api.js'
import { AuthContext } from '../../context/AuthContext.jsx'

import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const {login} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setMessage('')
    setLoading(true)

    try {
      const response = await api.post('/auth/login', {
        email,
        password
      })

      login(response.data.user, response.data.token)

      navigate('/feed')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login-page'>
      <div className='login-container'>
        <h1>SocialSphere</h1>
        <p>Welcome back</p>

        {message && <p className='error-message'>{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p>
          Don't have an account? <Link to='/signup'>Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login