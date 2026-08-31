import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Signup from './pages/Signup/Signup.jsx'

const Login = () => {
  return <h1>Login Page</h1>
}

const Feed = () => {
  return <h1>SocialSphere Feed</h1>
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/feed' element={<Feed />} />

        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App