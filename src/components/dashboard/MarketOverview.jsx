import { 
  Paper, 
  Typography, 
  Box, 
  Divider, 
  Chip,
  Grid
} from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon
} from '@mui/icons-material';

// Mock market indices data
const marketIndices = [
  { 
    name: 'NIFTY 50', 
    value: 22532.35, 
    change: 137.80, 
    percentChange: 0.62,
    trend: 'up'
  },
  { 
    name: 'SENSEX', 
    value: 73882.91, 
    change: 427.25, 
    percentChange: 0.58,
    trend: 'up'
  },
  { 
    name: 'NIFTY BANK', 
    value: 48263.70, 
    change: -53.45, 
    percentChange: -0.11,
    trend: 'down'
  },
  { 
    name: 'NIFTY IT', 
    value: 34582.15, 
    change: 456.90, 
    percentChange: 1.34,
    trend: 'up'
  }
];

// Mock sector performance data
const sectorPerformance = [
  { name: 'IT', change: 1.8, trend: 'up' },
  { name: 'Pharma', change: 0.9, trend: 'up' },
  { name: 'Banking', change: -0.3, trend: 'down' },
  { name: 'Auto', change: 1.2, trend: 'up' },
  { name: 'FMCG', change: -0.5, trend: 'down' },
  { name: 'Metal', change: 2.1, trend: 'up' },
  { name: 'Energy', change: 0.7, trend: 'up' },
  { name: 'Realty', change: -1.1, trend: 'down' }
];

// Market movers data
const marketMovers = {
  gainers: [
    { symbol: 'TATASTEEL', name: 'Tata Steel', change: 3.8 },
    { symbol: 'HCLTECH', name: 'HCL Technologies', change: 3.2 },
    { symbol: 'WIPRO', name: 'Wipro Ltd', change: 2.9 }
  ],
  losers: [
    { symbol: 'BAJFINANCE', name: 'Bajaj Finance', change: -2.1 },
    { symbol: 'ASIANPAINT', name: 'Asian Paints', change: -1.7 },
    { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp', change: -1.5 }
  ]
};

function MarketOverview() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper 
          elevation={1} 
          sx={{ 
            p: 3, 
            borderRadius: 2, 
            mb: 3,
            backgroundColor: 'background.paper'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Market Indices
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: 3,
              justifyContent: 'space-between'
            }}
          >
            {marketIndices.map((index) => (
              <Box 
                key={index.name} 
                sx={{ 
                  flex: '1 0 200px',
                  maxWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(25% - 16px)' }
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {index.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 1 }}>
                  <Typography variant="h5" fontWeight={600}>
                    {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: index.trend === 'up' ? 'success.main' : 'error.main',
                      display: 'flex',
                      alignItems: 'center',
                      fontWeight: 500
                    }}
                  >
                    {index.trend === 'up' ? <ArrowUpIcon fontSize="small" /> : <ArrowDownIcon fontSize="small" />}
                    {index.change > 0 ? '+' : ''}{index.change.toFixed(2)} ({index.percentChange > 0 ? '+' : ''}{index.percentChange.toFixed(2)}%)
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper 
          elevation={1} 
          sx={{ 
            p: 3, 
            borderRadius: 2,
            height: '100%',
            backgroundColor: 'background.paper'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Sector Performance
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {sectorPerformance.map((sector) => (
              <Chip 
                key={sector.name}
                label={`${sector.name} ${sector.change > 0 ? '+' : ''}${sector.change}%`}
                icon={sector.trend === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                color={sector.trend === 'up' ? 'success' : 'error'}
                variant="outlined"
                sx={{ 
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  m: 0.5
                }}
              />
            ))}
          </Box>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper 
          elevation={1} 
          sx={{ 
            p: 3, 
            borderRadius: 2,
            height: '100%',
            backgroundColor: 'background.paper'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Market Movers
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" fontWeight={600} color="success.main" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrendingUpIcon /> Top Gainers
            </Typography>
            {marketMovers.gainers.map((stock, index) => (
              <Box 
                key={stock.symbol}
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  py: 1,
                  borderBottom: index < marketMovers.gainers.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider'
                }}
              >
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    {stock.symbol}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stock.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="success.main" fontWeight={600}>
                  +{stock.change}%
                </Typography>
              </Box>
            ))}
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box>
            <Typography variant="body1" fontWeight={600} color="error.main" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrendingDownIcon /> Top Losers
            </Typography>
            {marketMovers.losers.map((stock, index) => (
              <Box 
                key={stock.symbol}
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  py: 1,
                  borderBottom: index < marketMovers.losers.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider'
                }}
              >
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    {stock.symbol}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stock.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="error.main" fontWeight={600}>
                  {stock.change}%
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MarketOverview;