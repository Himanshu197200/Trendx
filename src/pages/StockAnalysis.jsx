import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Container, Grid, Paper, Button, 
  CircularProgress, Alert, Chip, Divider, useTheme
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ReferenceLine
} from 'recharts';
import { getStockQuotes, getStockTimeSeries } from '../api/stocksApi';

// This page shows detailed information about a specific stock
function StockAnalysis() {
  // Get the stock symbol from the URL (like /stocks/AAPL)
  const { symbol } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Store all our data in state variables
  const [stock, setStock] = useState(null);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  // Function to get stock data from the server
  const fetchStockData = async (isRefreshing = false) => {
    try {
      // Show loading spinner when we're getting data
      if (!isRefreshing) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }
      
      // Get the stock's current information
      const stocksData = await getStockQuotes();
      const currentStock = stocksData.find(s => s.symbol === symbol) || null;
      
      // If we can't find the stock, show an error
      if (!currentStock) {
        setError(`Stock with symbol ${symbol} not found`);
        setLoading(false);
        setRefreshing(false);
        return;
      }
      
      setStock(currentStock);
      
      // Get the stock's historical price data for the chart
      const seriesData = await getStockTimeSeries(symbol);
      setTimeSeriesData(seriesData.values || []);
      
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Error fetching stock data:', err);
      setError('Failed to fetch stock data. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  // Load data when the page first loads
  useEffect(() => {
    if (symbol) {
      fetchStockData();
      
      // Get fresh data every 15 seconds
      const refreshInterval = setInterval(() => {
        fetchStockData(true);
      }, 15000);
      
      // Stop the refresh when leaving the page
      return () => clearInterval(refreshInterval);
    } else {
      navigate('/stocks');
    }
  }, [symbol, navigate]);
  
  // When the user clicks the refresh button
  const handleRefresh = () => {
    if (!refreshing) {
      fetchStockData(true);
    }
  };
  
  // Helper functions to format numbers
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(value);
  };
  
  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };
  
  // Show a loading spinner while getting data
  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  // Show an error message if something went wrong
  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">{error}</Alert>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/stocks')}
            sx={{ mt: 2 }}
          >
            Back to Stocks
          </Button>
        </Box>
      </Container>
    );
  }
  
  // Show a message if the stock wasn't found
  if (!stock) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Alert severity="warning">Stock not found</Alert>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/stocks')}
            sx={{ mt: 2 }}
          >
            Back to Stocks
          </Button>
        </Box>
      </Container>
    );
  }
  
  // Check if the stock price went up or down
  const isPositive = stock.percent_change >= 0;
  const TrendIcon = isPositive ? TrendingUpIcon : TrendingDownIcon;
  const trendColor = isPositive ? 'success.main' : 'error.main';
  
  // The main page content
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/stocks')}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            {stock.name} ({stock.symbol})
          </Typography>
        </Box>
        <Button
          startIcon={refreshing ? <CircularProgress size={20} /> : <RefreshIcon />}
          onClick={handleRefresh}
          disabled={refreshing}
          variant="outlined"
          color="primary"
        >
          Refresh
        </Button>
      </Box>
      
      {/* Stock price card */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {formatCurrency(stock.price)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendIcon sx={{ color: trendColor, mr: 1 }} />
                <Typography variant="h6" sx={{ color: trendColor, fontWeight: 600 }}>
                  {isPositive ? '+' : ''}{stock.percent_change}% ({formatCurrency(stock.change)})
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Open
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {formatCurrency(stock.open)}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  High
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {formatCurrency(stock.high)}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Low
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {formatCurrency(stock.low)}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Prev Close
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {formatCurrency(stock.previous_close)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Volume
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {formatNumber(stock.volume)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Price Chart Card */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
            Live Price History Chart
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box 
              sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                backgroundColor: refreshing ? 'warning.main' : 'success.main',
                mr: 1,
                animation: refreshing ? 'none' : 'pulse 2s infinite'
              }} 
            />
            <Typography variant="body2" color="text.secondary">
              {refreshing ? 'Updating...' : `Live data • Updated ${new Date().toLocaleTimeString()}`}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ height: 400, position: 'relative' }}>
          {refreshing && (
            <Box 
              sx={{ 
                position: 'absolute', 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center',
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                zIndex: 1
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {timeSeriesData && timeSeriesData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeSeriesData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="datetime" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis 
                  domain={['auto', 'auto']} 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.toLocaleString('en-US')}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Price']}
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString();
                  }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    border: `1px solid ${theme.palette.primary.light}`,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="close" 
                  name="Close Price"
                  stroke={theme.palette.primary.main} 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8, fill: theme.palette.primary.main, stroke: 'white', strokeWidth: 2 }}
                />
                {stock && <ReferenceLine 
                  y={stock.price} 
                  stroke={trendColor}
                  strokeDasharray="3 3"
                  label={{ 
                    position: 'right',
                    value: `Current: ${formatCurrency(stock.price)}`,
                    fill: trendColor,
                    fontSize: 12
                  }}
                />}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="body1" color="text.secondary">
                No data available for this stock
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default StockAnalysis; 