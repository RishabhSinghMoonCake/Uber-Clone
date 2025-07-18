import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/home.jsx'
import UserLogin from './pages/UserLogin.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignup from './pages/CaptainSignup.jsx'
import UserSignup from './pages/UserSignup.jsx'

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/signup" element={<UserSignup />} />
      </Routes>
    </div>
  )
}

export default App
