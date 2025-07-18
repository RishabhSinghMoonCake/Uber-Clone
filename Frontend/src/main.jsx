import UserContext from './context/userContext.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
createRoot(document.getElementById('root')).render(
  
  <UserContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </UserContext>
)
