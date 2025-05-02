import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  Button,
  CircularProgress,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  styled,
  Pagination
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useNavigate } from 'react-router-dom';

// Styled table cells to ensure consistent borders
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(81, 81, 81, 1)' : 'rgba(224, 224, 224, 1)'}`,
  padding: '16px',
  whiteSpace: 'nowrap'
}));

// Custom styled tabs with proper spacing
const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: '2px'
  },
  '& .MuiTabs-flexContainer': {
    gap: '60px' // This creates space between tabs
  }
}));

// Custom styled tab with proper spacing and styling
const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 'auto',
  padding: '12px 0',
  color: theme.palette.text.primary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: 600
  }
}));

function StocksPage() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();
  
  // Format time as HH:MM:SS
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour12: false });
  };
  
  // Mock stock data function - synchronous and guaranteed to work
  const getMockStockData = () => {
    const internationalStocks = [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 175.09, change: -1.25, percent_change: -0.75, isIndian: false },
      { symbol: 'MSFT', name: 'Microsoft Corporation', price: 339.37, change: 2.10, percent_change: 0.65, isIndian: false },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 132.74, change: -1.85, percent_change: -0.85, isIndian: false },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 129.87, change: 1.45, percent_change: 0.95, isIndian: false },
      { symbol: 'META', name: 'Meta Platforms Inc.', price: 299.50, change: 2.75, percent_change: 1.05, isIndian: false },
      { symbol: 'TSLA', name: 'Tesla Inc.', price: 238.70, change: 3.25, percent_change: 1.45, isIndian: false },
      { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 410.30, change: 4.50, percent_change: 1.25, isIndian: false },
      { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 143.60, change: 1.15, percent_change: 0.80, isIndian: false },
      { symbol: 'V', name: 'Visa Inc.', price: 242.90, change: 1.35, percent_change: 0.60, isIndian: false },
      { symbol: 'JNJ', name: 'Johnson & Johnson', price: 154.80, change: 0.95, percent_change: 0.55, isIndian: false },
      { symbol: 'NFLX', name: 'Netflix Inc.', price: 590.50, change: 3.75, percent_change: 0.70, isIndian: false },
      { symbol: 'DIS', name: 'Walt Disney Company', price: 111.20, change: 1.45, percent_change: 1.30, isIndian: false },
      { symbol: 'ADBE', name: 'Adobe Inc.', price: 481.30, change: 2.85, percent_change: 0.65, isIndian: false },
      { symbol: 'PYPL', name: 'PayPal Holdings Inc.', price: 62.40, change: 0.95, percent_change: 1.50, isIndian: false },
      { symbol: 'INTC', name: 'Intel Corporation', price: 31.20, change: 0.65, percent_change: 2.10, isIndian: false },
      { symbol: 'AMD', name: 'Advanced Micro Devices Inc.', price: 142.80, change: 2.35, percent_change: 1.65, isIndian: false }
    ];
    
    const indianStocks = [
      { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', price: 2580.50, change: 15.75, percent_change: 0.65, isIndian: true },
      { symbol: 'TCS', name: 'Tata Consultancy Services Ltd.', price: 3420.75, change: -25.50, percent_change: -0.85, isIndian: true },
      { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', price: 1582.30, change: 12.25, percent_change: 0.70, isIndian: true },
      { symbol: 'INFY', name: 'Infosys Ltd.', price: 1447.50, change: -10.50, percent_change: -0.75, isIndian: true },
      { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd.', price: 2457.25, change: 18.75, percent_change: 0.80, isIndian: true },
      { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd.', price: 924.60, change: 8.50, percent_change: 0.90, isIndian: true },
      { symbol: 'SBIN', name: 'State Bank of India', price: 582.35, change: 6.75, percent_change: 1.15, isIndian: true },
      { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd.', price: 852.40, change: 7.25, percent_change: 0.95, isIndian: true },
      { symbol: 'ITC', name: 'ITC Ltd.', price: 422.15, change: -4.20, percent_change: -1.05, isIndian: true },
      { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd.', price: 1723.45, change: 15.40, percent_change: 0.85, isIndian: true },
      { symbol: 'WIPRO', name: 'Wipro Ltd.', price: 423.80, change: 4.75, percent_change: 1.20, isIndian: true },
      { symbol: 'AXISBANK', name: 'Axis Bank Ltd.', price: 982.65, change: -8.20, percent_change: -0.90, isIndian: true },
      { symbol: 'HCLTECH', name: 'HCL Technologies Ltd.', price: 1152.30, change: 9.60, percent_change: 0.85, isIndian: true },
      { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd.', price: 3182.75, change: -22.50, percent_change: -0.70, isIndian: true },
      { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd.', price: 9762.40, change: 85.30, percent_change: 0.95, isIndian: true },
      { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd.', price: 652.35, change: 5.80, percent_change: 0.90, isIndian: true },
      { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries Ltd.', price: 1152.75, change: -10.25, percent_change: -0.85, isIndian: true },
      { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd.', price: 6382.60, change: 65.40, percent_change: 1.05, isIndian: true },
      { symbol: 'TATASTEEL', name: 'Tata Steel Ltd.', price: 121.35, change: 1.80, percent_change: 1.50, isIndian: true },
      { symbol: 'LT', name: 'Larsen & Toubro Ltd.', price: 2352.40, change: 18.50, percent_change: 0.80, isIndian: true }
    ];
    
    return [...internationalStocks, ...indianStocks];
  };
  
  // Load stock data
  const loadStockData = () => {
    const mockData = getMockStockData();
    setStocks(mockData); 
    setLoading(false);
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };
  
  // Initialize data
  useEffect(() => {
    loadStockData();
    
    // Refresh every 30 seconds
    const interval = setInterval(() => {
      setIsRefreshing(true);
      loadStockData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle refresh button click
  const handleRefresh = () => {
    setIsRefreshing(true);
    loadStockData();
  };
  
  // Handle view stock click
  const handleViewStock = (symbol) => {
    navigate(`/stocks/${symbol}`);
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSearchTerm('');
    setPage(1); // Reset to first page when changing tabs
  };
  
  // Handle search change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when searching
  };
  
  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  
  // Filter stocks based on search and tab
  const filteredStocks = (() => {
    let filtered = stocks;
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(stock => 
        stock.symbol.toLowerCase().includes(term) || 
        stock.name.toLowerCase().includes(term)
      );
    }
    
    // Apply tab filter
    if (tabValue === 1) {
      filtered = filtered.filter(stock => !stock.isIndian);
    } else if (tabValue === 2) {
      filtered = filtered.filter(stock => stock.isIndian);
    }
    
    return filtered;
  })();
  
  // Get current page stocks
  const currentStocks = (() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredStocks.slice(startIndex, endIndex);
  })();
  
  // Calculate counts
  const totalStocks = stocks.length;
  const indianCount = stocks.filter(s => s.isIndian).length;
  const internationalCount = stocks.filter(s => !s.isIndian).length;
  
  // Calculate pages
  const pageCount = Math.ceil(filteredStocks.length / rowsPerPage);

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2
      }}>
        <Typography variant="h4" component="h1" sx={{ 
          fontWeight: 700,
          color: 'text.primary'
        }}>
          Live Stocks
        </Typography>
        
        <Button 
          startIcon={isRefreshing ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon />} 
          variant="outlined" 
          onClick={handleRefresh}
          disabled={isRefreshing}
          sx={{ 
            borderRadius: 4,
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          Refresh
        </Button>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search stocks..."
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { 
              borderRadius: 8,
              bgcolor: 'background.paper'
            }
          }}
          sx={{ mb: 2 }}
        />
      </Box>
      
      <Paper 
        elevation={1} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden',
          '& .MuiTableCell-root': {
            borderBottom: theme => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(81, 81, 81, 1)' : 'rgba(224, 224, 224, 1)'}`,
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Market Overview
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              Last updated: {formatTime(lastUpdated)}
            </Typography>
          </Box>
          
          {/* Replace Tabs with StyledTabs */}
          <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider', 
            mb: 3,
            width: '100%' 
          }}>
            <StyledTabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="stock category tabs"
            >
              <StyledTab label={`All Stocks (${totalStocks})`} disableRipple />
              <StyledTab label={`International (${internationalCount})`} disableRipple />
              <StyledTab label={`Indian (${indianCount})`} disableRipple />
            </StyledTabs>
          </Box>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : filteredStocks.length === 0 ? (
            <Typography variant="h6" sx={{ textAlign: 'center', p: 3 }}>
              No stocks found matching '{searchTerm}'
            </Typography>
          ) : (
            <TableContainer 
              component={Box} 
              sx={{
                '& table': { borderCollapse: 'separate' },
                '& th': { borderBottom: theme => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(81, 81, 81, 1)' : 'rgba(224, 224, 224, 1)'}` },
                '& td': { borderBottom: theme => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(81, 81, 81, 1)' : 'rgba(224, 224, 224, 1)'}` }
              }}
            >
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ fontWeight: 600 }}>Symbol</StyledTableCell>
                    <StyledTableCell sx={{ fontWeight: 600 }}>Name</StyledTableCell>
                    <StyledTableCell align="right" sx={{ fontWeight: 600 }}>Price</StyledTableCell>
                    <StyledTableCell align="right" sx={{ fontWeight: 600 }}>Change</StyledTableCell>
                    <StyledTableCell align="right" sx={{ fontWeight: 600 }}>Change %</StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontWeight: 600 }}>Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentStocks.map((stock) => (
                    <TableRow key={stock.symbol}>
                      <StyledTableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                        {stock.symbol}
                      </StyledTableCell>
                      <StyledTableCell>{stock.name}</StyledTableCell>
                      <StyledTableCell align="right">${stock.price.toFixed(2)}</StyledTableCell>
                      <StyledTableCell align="right">
                        <Box sx={{ 
                          display: 'inline-flex', 
                          alignItems: 'center',
                          color: stock.change >= 0 ? 'success.main' : 'error.main'
                        }}>
                          {stock.change >= 0 ? (
                            <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                          ) : (
                            <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />
                          )}
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell 
                        align="right"
                        sx={{ 
                          color: stock.percent_change >= 0 ? 'success.main' : 'error.main',
                          fontWeight: 500
                        }}
                      >
                        {stock.percent_change >= 0 ? '+' : ''}{stock.percent_change.toFixed(2)}%
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button 
                          variant="contained" 
                          color="primary" 
                          onClick={() => handleViewStock(stock.symbol)}
                          sx={{ 
                            textTransform: 'none',
                            borderRadius: 28,
                            px: 3
                          }}
                        >
                          View
                        </Button>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
        
        {filteredStocks.length > 0 && pageCount > 1 && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            p: 2,
            borderTop: theme => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(81, 81, 81, 1)' : 'rgba(224, 224, 224, 1)'}`,
          }}>
            <Pagination 
              count={pageCount} 
              page={page} 
              onChange={handlePageChange} 
              shape="rounded"
              variant="outlined"
              color="primary"
              siblingCount={1}
              boundaryCount={1}
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: '4px',
                  mx: 0.5
                },
                '& .Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'primary.main',
                  }
                }
              }}
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default StocksPage;