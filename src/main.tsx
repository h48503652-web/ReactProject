import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { TicketsProvider } from './context/TicketsContext.tsx'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <AuthProvider>
      <TicketsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TicketsProvider>
    </AuthProvider>
  </StrictMode>

)
