import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Chip,
  Grid,
  Collapse,
  Paper,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Public as PublicIcon,
  ExpandMore as ExpandMoreIcon,
  SortByAlpha as SortByAlphaIcon
} from '@mui/icons-material';

// Indian stocks list with realistic data
const indianStocks = [
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries', change: 2.3 },
  { symbol: 'TCS.NS', name: 'Tata Consultancy Services', change: 1.5 },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank', change: 0.8 },
  { symbol: 'INFY.NS', name: 'Infosys', change: -1.2 },
  { symbol: 'ICICIBANK.NS', name: 'ICICI Bank', change: 1.1 },
  { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever', change: -0.5 },
  { symbol: 'SBIN.NS', name: 'State Bank of India', change: 1.7 },
  { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel', change: 0.9 },
  { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance', change: -2.1 },
  { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank', change: 0.4 },
  { symbol: 'HCLTECH.NS', name: 'HCL Technologies', change: 1.3 },
  { symbol: 'WIPRO.NS', name: 'Wipro', change: -0.3 },
  { symbol: 'ASIANPAINT.NS', name: 'Asian Paints', change: 0.6 },
  { symbol: 'AXISBANK.NS', name: 'Axis Bank', change: 1.8 },
  { symbol: 'MARUTI.NS', name: 'Maruti Suzuki', change: -1.4 },
  { symbol: 'TATASTEEL.NS', name: 'Tata Steel', change: 2.7 },
  { symbol: 'SUNPHARMA.NS', name: 'Sun Pharmaceutical', change: 0.2 },
  { symbol: 'ITC.NS', name: 'ITC Limited', change: 1.2 },
  { symbol: 'POWERGRID.NS', name: 'Power Grid Corporation', change: -0.7 },
  { symbol: 'NTPC.NS', name: 'NTPC Limited', change: 0.5 },
  { symbol: 'TATAMOTORS.NS', name: 'Tata Motors', change: 3.1 },
  { symbol: 'ONGC.NS', name: 'Oil & Natural Gas Corporation', change: -1.8 },
  { symbol: 'BAJAJFINSV.NS', name: 'Bajaj Finserv', change: 0.9 },
  { symbol: 'ULTRACEMCO.NS', name: 'UltraTech Cement', change: 1.5 },
  { symbol: 'ADANIPORTS.NS', name: 'Adani Ports', change: -2.3 }
];

const IndianStocksMenu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const [sortOrder, setSortOrder] = useState('default');

  const handleSortChange = () => {
    if (sortOrder === 'default') setSortOrder('alphabetical');
    else if (sortOrder === 'alphabetical') setSortOrder('performance');
    else setSortOrder('default');
  };

  // Apply sorting
  const getSortedStocks = () => {
    if (sortOrder === 'alphabetical') {
      return [...indianStocks].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'performance') {
      return [...indianStocks].sort((a, b) => b.change - a.change);
    }
    return indianStocks;
  };

  const handleStockClick = (symbol) => {
    navigate(`/stocks/${symbol}`);
  };

  const sortedStocks = getSortedStocks();

  return (
    <Paper 
      elevation={3} 
      sx={{
        p: 3, 
        borderRadius: 2,
        borderTop: `4px solid ${theme.palette.primary.main}`,
        mb: 3
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 700, 
          display: 'flex', 
          alignItems: 'center',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: 40,
            height: 3,
            backgroundColor: theme.palette.primary.main,
            borderRadius: '3px',
          }
        }}>
          <PublicIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          Indian Stocks
        </Typography>
        
        <Box>
          <IconButton 
            onClick={handleSortChange} 
            color="primary"
            sx={{ mr: 1 }}
          >
            <SortByAlphaIcon />
          </IconButton>
          <IconButton 
            onClick={() => setExpanded(!expanded)} 
            sx={{ 
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </Box>
      
      <Collapse in={expanded}>
        <Box sx={{ py: 1 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {sortOrder === 'alphabetical' ? 'Sorted alphabetically' : 
             sortOrder === 'performance' ? 'Sorted by performance' : 
             'Top Indian stocks'}
          </Typography>
        </Box>
        
        <Grid container spacing={1}>
          {sortedStocks.map((stock) => (
            <Grid item key={stock.symbol}>
              <Chip
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography component="span" sx={{ fontWeight: 600 }}>
                      {stock.symbol.split('.')[0]}
                    </Typography>
                    <Typography 
                      component="span" 
                      sx={{ 
                        color: stock.change > 0 ? 'success.main' : 'error.main',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      {stock.change > 0 ? 
                        <TrendingUpIcon fontSize="small" /> : 
                        <TrendingDownIcon fontSize="small" />}
                      {stock.change > 0 ? '+' : ''}{stock.change}%
                    </Typography>
                  </Box>
                }
                onClick={() => handleStockClick(stock.symbol)}
                clickable
                variant="outlined"
                color={stock.change > 0 ? "success" : stock.change < 0 ? "error" : "primary"}
                sx={{ 
                  fontWeight: 600,
                  padding: '16px 4px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)'
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </Paper>
  );
};

export default IndianStocksMenu; 