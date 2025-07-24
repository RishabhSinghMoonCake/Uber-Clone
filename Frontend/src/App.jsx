import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home.jsx'
import Start from './pages/Start.jsx'
import UserLogin from './pages/UserLogin.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignup from './pages/CaptainSignup.jsx'
import UserSignup from './pages/UserSignup.jsx'
import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx'
import UserLogout from './pages/UserLogout.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper.jsx'

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/signup" element={<UserSignup />} />
        
        <Route path="/home" element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />

        <Route path='/user/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />
        <Route path="/captain-home" element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App
