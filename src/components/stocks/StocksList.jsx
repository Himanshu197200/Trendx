import { useState, useEffect } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Search as SearchIcon,
  ViewModule as GridViewIcon,
  ViewList as ListViewIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import StockCard from './StockCard';
import StockListItem from './StockListItem';
import { getStockQuotes } from '../../api/stocksApi';

function StocksList({ viewMode, setViewMode }) {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchStocks();
    
    // Set up interval to refresh stock data every 60 seconds
    const interval = setInterval(fetchStocks, 60000);
    
    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    // Filter stocks based on search query
    if (searchQuery.trim() === '') {
      setFilteredStocks(stocks);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = stocks.filter(stock => 
        stock.symbol.toLowerCase().includes(query) || 
        stock.name.toLowerCase().includes(query)
      );
      setFilteredStocks(filtered);
    }
  }, [searchQuery, stocks]);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      const data = await getStockQuotes();
      setStocks(data);
      setFilteredStocks(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Error fetching stocks:', err);
      setError('Failed to fetch stock data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  const handleRefresh = () => {
    fetchStocks();
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            mb: 2
          }}
        >
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
            Live Stocks
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              aria-label="view mode"
              size="small"
              className="view-toggle"
            >
              <ToggleButton value="grid" aria-label="grid view">
                <GridViewIcon />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list view">
                <ListViewIcon />
              </ToggleButton>
            </ToggleButtonGroup>
            
            <IconButton 
              onClick={handleRefresh} 
              color="primary"
              aria-label="refresh"
              className={loading ? 'loading-spinner' : ''}
            >
              <RefreshIcon />
            </IconButton>
          </Box>
        </Box>

        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <TextField
            size="small"
            placeholder="Search stocks..."
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ 
              width: { xs: '100%', sm: '300px' },
              transition: 'all 0.3s ease'
            }}
            className="search-field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          
          <Typography variant="body2" color="text.secondary">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </Typography>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading && stocks.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {filteredStocks.length === 0 ? (
            <Paper 
              sx={{ 
                p: 3, 
                textAlign: 'center', 
                borderRadius: 2,
                backgroundColor: 'background.paper'
              }}
            >
              <Typography variant="h6">
                No stocks found matching '{searchQuery}'
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try a different search term or clear the search
              </Typography>
            </Paper>
          ) : (
            viewMode === 'grid' ? (
              <Grid container spacing={3}>
                {filteredStocks.map((stock) => (
                  <Grid item xs={12} sm={6} md={4} key={stock.symbol}>
                    <StockCard stock={stock} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                {filteredStocks.map((stock, index) => (
                  <Box key={stock.symbol}>
                    <StockListItem stock={stock} />
                    {index < filteredStocks.length - 1 && <Divider />}
                  </Box>
                ))}
              </Paper>
            )
          )}
        </>
      )}
    </Box>
  );
}

export default StocksList;