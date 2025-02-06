import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ApiProvider } from './context/api-context.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiProvider>
      <App />
    </ApiProvider>
  </React.StrictMode>,
)
