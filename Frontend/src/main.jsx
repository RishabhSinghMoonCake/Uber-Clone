import UserContext from './context/userContext.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import CaptainContext from './context/CaptainContext.jsx'
createRoot(document.getElementById('root')).render(
  <CaptainContext>
    <UserContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContext>
  </CaptainContext>
)
