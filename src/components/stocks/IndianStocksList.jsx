import React from 'react';
import { Box, Typography, Chip, Grid, Paper } from '@mui/material';

// Simple list of Indian stocks
const indianStocks = [
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries', change: 2.3 },
  { symbol: 'TCS.NS', name: 'Tata Consultancy Services', change: 1.5 },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank', change: 0.8 },
  { symbol: 'INFY.NS', name: 'Infosys', change: -1.2 },
  { symbol: 'ICICIBANK.NS', name: 'ICICI Bank', change: 1.1 }
];

// Extremely simplified component
function IndianStocksList() {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Indian Stocks
      </Typography>
      <Grid container spacing={1}>
        {indianStocks.map((stock) => (
          <Grid item key={stock.symbol}>
            <Chip 
              label={`${stock.symbol.split('.')[0]} ${stock.change > 0 ? '+' : ''}${stock.change}%`}
              color={stock.change > 0 ? "success" : "error"}
              variant="outlined"
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default IndianStocksList; 