import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GlobalDataProvider } from './context/data/GlobalDataProvider.jsx'
import { CartProvider } from './context/cart/GlobalCartProvider.jsx'
import { AuthProvider } from './context/auth/AuthProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <GlobalDataProvider>
          <App />
        </GlobalDataProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
