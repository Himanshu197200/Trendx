import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { getStockQuotes } from '../../api/stocksApi';

function StockTicker() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Format price with 2 decimal places
  const formatPrice = (value) => {
    if (value === null || value === undefined || isNaN(value)) {
      return '0.00';
    }
    return parseFloat(value).toFixed(2);
  };

  // Fetch stocks data
  const fetchStocks = async () => {
    try {
      setError(false);
      const data = await getStockQuotes();
      if (data && data.length > 0) {
        setStocks(data);
      } else {
        setError(true);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stock quotes:', error);
      setError(true);
      setLoading(false);
    }
  };

  // Load data on component mount with retry
  useEffect(() => {
    fetchStocks();
    
    // Refresh every 30 seconds
    const interval = setInterval(() => {
      fetchStocks();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box sx={{ width: '100%', py: 1, bgcolor: 'background.paper', display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={20} />
      </Box>
    );
  }

  if (error || stocks.length === 0) {
    return (
      <Box sx={{ width: '100%', py: 1, bgcolor: 'background.paper', display: 'flex', justifyContent: 'center' }}>
        <Typography variant="body2" color="error">Unable to load market data</Typography>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        width: '100%', 
        py: 1, 
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden'
      }}
    >
      <Box 
        sx={{ 
          display: 'flex',
          animation: 'ticker 60s linear infinite',
          '@keyframes ticker': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' }
          },
          '&:hover': {
            animationPlayState: 'paused'
          }
        }}
      >
        {/* Display each stock twice for continuous scrolling */}
        {[...stocks, ...stocks].map((stock, index) => {
          const isPositive = parseFloat(stock.change) >= 0;
          
          return (
            <Box 
              key={`${stock.symbol}-${index}`}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mr: 4,
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              <Typography variant="body2" fontWeight="bold" sx={{ mr: 1 }}>
                {stock.symbol}
              </Typography>
              
              <Typography 
                variant="body2" 
                color={isPositive ? 'success.main' : 'error.main'}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center'
                }}
              >
                ${formatPrice(stock.price)}&nbsp;
                {isPositive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
                {isPositive ? '+' : ''}{formatPrice(stock.change)}
                ({isPositive ? '+' : ''}{formatPrice(stock.percent_change)}%)
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default StockTicker; 