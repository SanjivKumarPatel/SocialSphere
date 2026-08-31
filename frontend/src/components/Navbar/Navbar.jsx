import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext.jsx'

import './Navbar.css'

const Navbar = () => {
  const {user, logout} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()

    navigate('/login')
  }

  return (
    <nav className='navbar'>
      <h2>SocialSphere</h2>

      <div className='navbar-user'>
        <span>{user?.username}</span>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar