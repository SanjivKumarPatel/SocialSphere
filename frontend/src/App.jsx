import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'
import Feed from './pages/Feed/Feed.jsx'

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