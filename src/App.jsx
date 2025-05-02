// This file controls the main layout and navigation of our application
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import Dashboard from './pages/Dashboard'
import StocksPage from './pages/StocksPage'
import AboutContact from './pages/AboutContact'
import PortfolioPage from './pages/PortfolioPage'
import StockTicker from './components/stocks/StockTicker'
import NewsArticlePage from './pages/NewsArticlePage'
import Education from './pages/Education'
import StockDetailPage from './pages/StockDetailPage'
import { ThemeProvider, useThemeMode } from './context/ThemeContext'
import './App.css'

// Main App with theme applied
function AppContent() {
  const { mode } = useThemeMode();
  
  return (
    <Box 
      className="app-container"
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100vh',
        transition: 'background-color 0.3s ease'
      }}
    >
      {/* Top navigation bar */}
      <NavBar />
      
      {/* Moving stock ticker */}
      <ErrorBoundary>
        <StockTicker />
      </ErrorBoundary>
      
      {/* Main content area - changes based on the current page */}
      <Box className="page-content">
        <Routes>
          {/* Home page */}
          <Route path="/" element={<Dashboard />} />
          
          {/* All stocks list page */}
          <Route path="/stocks" element={<StocksPage />} />
          
          {/* Individual stock details page */}
          <Route path="/stocks/:symbol" element={<StockDetailPage />} />
          
          {/* User's portfolio page */}
          <Route path="/portfolio" element={<PortfolioPage />} />
          
          {/* About & contact page */}
          <Route path="/about" element={<AboutContact />} />
          
          {/* News article page */}
          <Route path="/news/:newsId" element={<NewsArticlePage />} />
          
          {/* Education page */}
          <Route path="/education" element={<Education />} />
        </Routes>
      </Box>
      
      {/* Bottom footer */}
      <Footer />
    </Box>
  )
}

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <AppContent />
    </ThemeProvider>
  )
}

// Simple error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Component failed to load.</div>;
    }
    return this.props.children;
  }
}

export default App