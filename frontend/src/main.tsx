import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router.tsx'
import './index.css'
import { AuthProvider } from './lib/useAuth.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </StrictMode>,
)
