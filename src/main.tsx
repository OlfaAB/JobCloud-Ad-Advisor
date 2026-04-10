import React from 'react'
import ReactDOM from 'react-dom/client'
// Import standalone version for AI Policy Document
import App from './App-standalone.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
