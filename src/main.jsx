// This is the main starting point of our application
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from './context/ThemeContext'
import ErrorBoundary from './components/ErrorBoundary'

// Start the application by rendering into the root element
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <ThemeProvider>
          <CssBaseline />
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
        </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)