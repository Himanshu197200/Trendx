import React, { useState, useEffect, useRef } from 'react';
import { 
  Container,
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Chip,
  Grid,
  Card,
  CardContent,
  Divider,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, Area, AreaChart, ReferenceLine,
  BarChart, Bar, ComposedChart, Scatter
} from 'recharts';
import { fetchRealTimeStockData } from '../api/stocksApi';

function StockDetailPage() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stockData, setStockData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [error, setError] = useState(false);
  const [chartTimeframe, setChartTimeframe] = useState('1M');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Format time as HH:MM:SS
  const formatTime = (date) => {
    return date.toTimeString().split(' ')[0];
  };

  // Format price with 2 decimal places
  const formatPrice = (value) => {
    if (value === null || value === undefined || isNaN(value)) {
      return '0.00';
    }
    return parseFloat(value).toFixed(2);
  };

  // Check if it's an Indian stock
  const isIndianStock = (sym) => {
    return ['RELIANCE', 'TCS', 'HDFC', 'INFY', 'ITC', 'TATAMOTORS'].some(
      s => sym.includes(s)
    );
  };

  // Get stock name based on symbol
  const getStockName = (sym) => {
    const stockNames = {
      'AAPL': 'Apple Inc.',
      'MSFT': 'Microsoft Corporation',
      'GOOGL': 'Alphabet Inc.',
      'AMZN': 'Amazon.com Inc.',
      'META': 'Meta Platforms Inc.',
      'TSLA': 'Tesla Inc.',
      'NVDA': 'NVIDIA Corporation',
      'JPM': 'JPMorgan Chase & Co.',
      'V': 'Visa Inc.',
      'RELIANCE': 'Reliance Industries Ltd.',
      'TCS': 'Tata Consultancy Services Ltd.',
      'HDFCBANK': 'HDFC Bank Ltd.',
      'INFY': 'Infosys Ltd.',
      'HINDUNILVR': 'Hindustan Unilever Ltd.',
      'ICICIBANK': 'ICICI Bank Ltd.',
      'SBIN': 'State Bank of India',
      'BHARTIARTL': 'Bharti Airtel Ltd.',
      'ITC': 'ITC Ltd.',
      'TATAMOTORS': 'Tata Motors Ltd.'
    };
    
    return stockNames[sym] || `${sym} Stock`;
  };

  // Generate mock stock data with guaranteed values
  const getMockStockData = () => {
    // Safety check for symbol
    if (!symbol) {
      throw new Error('No symbol provided');
    }

    // Check if this is an Indian stock
    const isIndian = isIndianStock(symbol);

    // Generate consistent price data
    const basePrice = isIndian ? 
      (symbol.includes('RELIANCE') ? 2580 : 
       symbol.includes('TCS') ? 3420 : 
       symbol.includes('HDFC') ? 1580 : 
       symbol.includes('INFY') ? 1450 : 
       symbol.includes('ITC') ? 420 : 950) : 
      (symbol === 'AAPL' ? 175 : 
       symbol === 'MSFT' ? 340 : 
       symbol === 'GOOGL' ? 130 : 
       symbol === 'AMZN' ? 125 : 200);

    // Generate deterministic changes based on symbol
    const seed = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const change = (seed % 2 === 0 ? 1 : -1) * ((seed % 5) + 1);
    const percentChange = (change / basePrice) * 100;

    // Create stock object with guaranteed values
    return {
      symbol: symbol,
      name: getStockName(symbol),
      price: basePrice,
      change: change,
      percent_change: percentChange,
      high: basePrice + 10,
      low: basePrice - 10,
      open: basePrice - change * 0.5,
      volume: 5000000 + (seed % 5000000),
      previous_close: basePrice - change,
      isIndian: isIndian
    };
  };

  // Generate more realistic chart data with price variations
  const generateRealisticChartData = () => {
    if (!symbol) return [];
    
    const basePrice = symbol.includes('RELIANCE') ? 2580 : 
                     symbol.includes('TCS') ? 3420 : 
                     symbol === 'AAPL' ? 175 : 
                     symbol === 'MSFT' ? 340 : 200;
    
    const volatility = symbol === 'TSLA' ? 0.025 : 0.015; // Tesla more volatile
    const trend = (symbol === 'AAPL' || symbol === 'MSFT' || symbol.includes('RELIANCE')) ? 0.001 : -0.0005; // Some stocks trend up, others down
    
    const data = [];
    const today = new Date();
    let lastPrice = basePrice;
    let lastVolume = 1000000 + Math.random() * 5000000;
    
    // Generate 90 days of data for different timeframes
    for (let i = 90; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // More realistic price movement with some random walk + trend
      const changePercent = (Math.random() - 0.5) * volatility * 2 + trend;
      const openPrice = lastPrice * (1 + (Math.random() - 0.5) * 0.005);
      const closePrice = lastPrice * (1 + changePercent);
      const highPrice = Math.max(openPrice, closePrice) * (1 + Math.random() * 0.01);
      const lowPrice = Math.min(openPrice, closePrice) * (1 - Math.random() * 0.01);
      
      // Volume spike on big price movements
      const volumeChange = 1 + (Math.random() - 0.5) * 0.3 + Math.abs(changePercent) * 10;
      const volume = Math.max(100000, lastVolume * volumeChange);
      
      data.push({
        date: date.toISOString().split('T')[0],
        open: parseFloat(openPrice.toFixed(2)),
        high: parseFloat(highPrice.toFixed(2)),
        low: parseFloat(lowPrice.toFixed(2)),
        close: parseFloat(closePrice.toFixed(2)),
        volume: Math.round(volume),
        // Add SMA values (Simple Moving Averages)
        sma20: i < 70 ? calculateSMA(data.slice(-19), closePrice) : null,
        sma50: i < 40 ? calculateSMA(data.slice(-49), closePrice) : null
      });
      
      lastPrice = closePrice;
      lastVolume = volume;
    }
    
    return data;
  };
  
  // Calculate Simple Moving Average
  const calculateSMA = (previousData, currentPrice) => {
    if (previousData.length === 0) return currentPrice;
    
    const sum = previousData.reduce((acc, item) => acc + item.close, 0) + currentPrice;
    return parseFloat((sum / (previousData.length + 1)).toFixed(2));
  };

  // Modified fetchStockData to use realistic data
  const fetchStockData = async () => {
    setIsRefreshing(true);
    setError(false);
    
    try {
      const mockStockData = getMockStockData();
      const realisticChartData = generateRealisticChartData();
      
      if (!mockStockData || !realisticChartData || realisticChartData.length === 0) {
        throw new Error('Failed to generate data');
      }
      
      setStockData(mockStockData);
      setChartData(realisticChartData);
      setLastUpdated(new Date());
      setLoading(false);
      setIsRefreshing(false);
    } catch (error) {
      console.error('Error generating stock data:', error);
      setError(true);
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchStockData();
  }, [symbol]);

  // Handle refresh button click
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      fetchStockData();
    }, 500);
  };

  // Handle back button click
  const handleBack = () => {
    navigate('/stocks');
  };

  // Helper to get filtered data based on selected timeframe
  const getTimeframeData = () => {
    if (!chartData || chartData.length === 0) return [];
    
    switch (chartTimeframe) {
      case '1W':
        return chartData.slice(-7);
      case '1M':
        return chartData.slice(-30);
      case '3M':
        return chartData.slice(-90);
      case 'ALL':
        return chartData;
      default:
        return chartData.slice(-30);
    }
  };

  // Professional chart component with improved responsiveness
  function ProfessionalStockChart() {
    const data = getTimeframeData();
    if (!data || data.length === 0) {
      return <CircularProgress />;
    }
    
    const isPositive = data[data.length - 1].close >= data[0].close;
    const priceColor = isPositive ? '#22c55e' : '#ef4444';
    
    // Format for tooltip and axes
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    
    // Custom tooltip with size adjustments for smaller screens
    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
          <Paper sx={{ 
            p: isMobile ? 1 : 2, 
            boxShadow: 3, 
            bgcolor: 'background.paper', 
            border: '1px solid rgba(0,0,0,0.1)',
            maxWidth: isMobile ? 220 : 280
          }}>
            <Typography variant={isMobile ? "caption" : "subtitle2"} fontWeight="bold">
              {formatDate(label)}
            </Typography>
            <Divider sx={{ my: 0.5 }} />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Open</Typography>
                <Typography variant="caption" fontWeight="medium">${formatPrice(data.open)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Close</Typography>
                <Typography 
                  variant="caption" 
                  fontWeight="bold"
                  color={data.close > data.open ? 'success.main' : 'error.main'}
                >
                  ${formatPrice(data.close)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>High</Typography>
                <Typography variant="caption" fontWeight="medium">${formatPrice(data.high)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Low</Typography>
                <Typography variant="caption" fontWeight="medium">${formatPrice(data.low)}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Volume</Typography>
                <Typography variant="caption" fontWeight="medium">
                  {new Intl.NumberFormat('en-US').format(data.volume)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        );
      }
      return null;
    };
    
    // Simplified candle renderer that works better in constrained spaces
    const renderCandlestick = (props) => {
      const { x, y, width, height, index, payload } = props;
      const data = payload;
      
      // Adjust for small screens
      const candleWidth = isMobile ? Math.max(1, width/2) : Math.max(2, width-2);
      const wickWidth = isMobile ? 1 : Math.max(1, width/8);
      
      const isPositive = data.close >= data.open;
      const color = isPositive ? '#22c55e' : '#ef4444';
      
      const openY = data.open > data.close ? y : y + height;
      const closeY = data.open > data.close ? y + height : y;
      
      return (
        <g key={`candle-${index}`}>
          {/* High-low wick */}
          <line 
            x1={x + width/2} 
            x2={x + width/2} 
            y1={y} 
            y2={y + height} 
            stroke={color} 
            strokeWidth={wickWidth} 
          />
          {/* Body - made narrower for small screens */}
          <rect 
            x={x + (width - candleWidth)/2} 
            y={isPositive ? closeY : openY} 
            width={candleWidth} 
            height={Math.abs(openY - closeY) || 1} 
            fill={color} 
            stroke="none" 
          />
        </g>
      );
    };
    
    // Dynamic height calculations based on screen size
    const mainChartHeight = isMobile ? "60%" : isTablet ? "65%" : "70%";
    const volumeChartHeight = isMobile ? "30%" : isTablet ? "25%" : "20%";
    
    return (
      <Box sx={{ width: '100%', height: isMobile ? 350 : isTablet ? 400 : 450 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Tabs 
            value={chartTimeframe}
            onChange={(e, val) => setChartTimeframe(val)}
            sx={{ 
              '& .MuiTab-root': { 
                minWidth: isMobile ? 30 : 50, 
                px: isMobile ? 1 : 2,
                fontSize: isMobile ? '0.7rem' : '0.8rem',
                fontWeight: 'bold'
              } 
            }}
          >
            <Tab label="1W" value="1W" />
            <Tab label="1M" value="1M" />
            <Tab label="3M" value="3M" />
            <Tab label="All" value="ALL" />
          </Tabs>
        </Box>
        
        {/* Main price chart */}
        <ResponsiveContainer width="100%" height={mainChartHeight}>
          <ComposedChart 
            data={data} 
            margin={{ 
              top: 5, 
              right: isMobile ? 5 : 20, 
              left: isMobile ? 5 : 10, 
              bottom: 0 
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              tickLine={false}
              minTickGap={isMobile ? 50 : 30}
              height={20}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              interval={isMobile ? 'preserveEnd' : 0}
            />
            <YAxis 
              domain={['auto', 'auto']}
              tickFormatter={(value) => `$${formatPrice(value)}`}
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              width={isMobile ? 40 : 50}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Moving averages - simplified for mobile */}
            {!isMobile && (
              <>
                <Line 
                  type="monotone" 
                  dataKey="sma20" 
                  stroke="#4338ca" 
                  dot={false} 
                  activeDot={false}
                  strokeWidth={1.5}
                  name="SMA 20"
                />
                <Line 
                  type="monotone" 
                  dataKey="sma50" 
                  stroke="#c026d3" 
                  dot={false} 
                  activeDot={false}
                  strokeWidth={1.5}
                  name="SMA 50"
                />
              </>
            )}
            
            {/* Custom candlestick renderer */}
            <Scatter 
              dataKey="close" 
              shape={renderCandlestick} 
              isAnimationActive={false}
              name="Price"
            />
          </ComposedChart>
        </ResponsiveContainer>
        
        {/* Volume chart - simplified for mobile */}
        <ResponsiveContainer width="100%" height={volumeChartHeight}>
          <BarChart 
            data={data} 
            margin={{ 
              top: 0, 
              right: isMobile ? 5 : 20, 
              left: isMobile ? 5 : 10, 
              bottom: isMobile ? 0 : 5 
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" vertical={false} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              axisLine={false}
              tickLine={false}
              minTickGap={isMobile ? 50 : 30}
              height={20}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              interval={isMobile ? 'preserveEnd' : 0}
            />
            <YAxis 
              tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              width={isMobile ? 40 : 50}
            />
            <Tooltip 
              formatter={(value) => [`${new Intl.NumberFormat('en-US').format(value)}`, 'Volume']}
              labelFormatter={formatDate}
            />
            <Bar 
              dataKey="volume" 
              fill="rgba(100, 116, 139, 0.8)"
              name="Volume"
            />
          </BarChart>
        </ResponsiveContainer>
        
        {/* Legend - simplified for mobile */}
        {!isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <Chip 
              label="SMA 20" 
              size="small" 
              sx={{ bgcolor: '#4338ca', color: 'white', mr: 1, fontWeight: 'bold', height: 20 }} 
            />
            <Chip 
              label="SMA 50" 
              size="small" 
              sx={{ bgcolor: '#c026d3', color: 'white', mr: 1, fontWeight: 'bold', height: 20 }} 
            />
            <Chip 
              label={isPositive ? 'Bullish' : 'Bearish'} 
              size="small" 
              sx={{ bgcolor: priceColor, color: 'white', fontWeight: 'bold', height: 20 }} 
            />
          </Box>
        )}
      </Box>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', flexDirection: 'column' }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 3 }}>Loading stock data...</Typography>
        </Box>
      </Container>
    );
  }

  // Check if we have valid stock data
  if (error || !stockData) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={handleBack}
            sx={{ textTransform: 'none' }}
          >
            Back to Stocks
          </Button>
        </Box>
        
        <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error">
            Failed to load stock data for {symbol}
          </Typography>
          <Button 
            variant="contained" 
            sx={{ mt: 3 }}
            onClick={handleRefresh}
          >
            Try Again
          </Button>
        </Paper>
      </Container>
    );
  }

  const isPositive = parseFloat(stockData.change) >= 0;

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        mt: isMobile ? 1 : 2, 
        mb: isMobile ? 2 : 4,
        px: isMobile ? 1 : 2
      }}
    >
      <Box sx={{ mb: isMobile ? 1 : 3 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={handleBack}
          sx={{ textTransform: 'none' }}
          size={isMobile ? "small" : "medium"}
        >
          Back to Stocks
        </Button>
      </Box>
      
      {/* Stock header with responsive design */}
      <Grid container spacing={isMobile ? 1 : 3} sx={{ mb: isMobile ? 1 : 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: isMobile ? 2 : 3, borderRadius: 2 }}>
            <Typography variant={isMobile ? "h6" : "h5"} fontWeight="600" noWrap>
              {stockData?.name} ({stockData?.symbol})
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
                ${formatPrice(stockData?.price)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                {stockData?.change >= 0 ? (
                  <TrendingUpIcon color="success" fontSize={isMobile ? "small" : "medium"} />
                ) : (
                  <TrendingDownIcon color="error" fontSize={isMobile ? "small" : "medium"} />
                )}
                <Typography 
                  variant={isMobile ? "body2" : "body1"} 
                  color={stockData?.change >= 0 ? 'success.main' : 'error.main'}
                  fontWeight="bold"
                  sx={{ ml: 0.5 }}
                >
                  {stockData?.change >= 0 ? '+' : ''}
                  {formatPrice(stockData?.change)} ({formatPrice(stockData?.percent_change)}%)
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: isMobile ? 2 : 3, borderRadius: 2, height: '100%' }}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">Open</Typography>
                <Typography variant={isMobile ? "body2" : "body1"} fontWeight="medium">
                  ${formatPrice(stockData?.open)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">Previous Close</Typography>
                <Typography variant={isMobile ? "body2" : "body1"} fontWeight="medium">
                  ${formatPrice(stockData?.previous_close)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">High</Typography>
                <Typography variant={isMobile ? "body2" : "body1"} fontWeight="medium">
                  ${formatPrice(stockData?.high)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">Low</Typography>
                <Typography variant={isMobile ? "body2" : "body1"} fontWeight="medium">
                  ${formatPrice(stockData?.low)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary">Volume</Typography>
                <Typography variant={isMobile ? "body2" : "body1"} fontWeight="medium">
                  {new Intl.NumberFormat('en-US').format(stockData?.volume)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Chart card with optimized padding */}
      <Paper 
        sx={{ 
          p: isMobile ? 1 : 2, 
          mb: 2, 
          borderRadius: 2,
          overflow: 'hidden' // Prevent any overflow
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 1,
          flexWrap: isMobile ? 'wrap' : 'nowrap'
        }}>
          <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight="600">
            Price Chart
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mt: isMobile ? 1 : 0,
            width: isMobile ? '100%' : 'auto',
            justifyContent: isMobile ? 'space-between' : 'flex-end'
          }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', mr: 1 }}>
              Updated: {formatTime(lastUpdated)}
            </Typography>
            <Button 
              startIcon={isRefreshing ? <CircularProgress size={16} /> : <RefreshIcon />}
              onClick={handleRefresh}
              disabled={isRefreshing}
              size="small"
              sx={{ minWidth: isMobile ? 'auto' : 80 }}
            >
              {isMobile ? '' : 'Refresh'}
            </Button>
          </Box>
        </Box>
        <Divider sx={{ mb: 1 }} />
        
        {/* Optimized chart component */}
        <ProfessionalStockChart />
      </Paper>
      
      {/* Add Historical Price Table */}
      <Paper 
        sx={{ 
          p: isMobile ? 1 : 2, 
          mb: 2, 
          borderRadius: 2,
          overflow: 'auto' // Allow scrolling for the table
        }}
      >
        <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight="600" gutterBottom>
          Price History
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        {/* Responsive table with horizontal scroll if needed */}
        <Box sx={{ overflow: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: isMobile ? '0.75rem' : '0.875rem'
          }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(0,0,0,0.04)' }}>
                <th style={{ padding: isMobile ? '8px 4px' : '10px 16px', textAlign: 'left' }}>Date</th>
                <th style={{ padding: isMobile ? '8px 4px' : '10px 16px', textAlign: 'right' }}>Open</th>
                <th style={{ padding: isMobile ? '8px 4px' : '10px 16px', textAlign: 'right' }}>High</th>
                <th style={{ padding: isMobile ? '8px 4px' : '10px 16px', textAlign: 'right' }}>Low</th>
                <th style={{ padding: isMobile ? '8px 4px' : '10px 16px', textAlign: 'right' }}>Close</th>
                <th style={{ padding: isMobile ? '8px 4px' : '10px 16px', textAlign: 'right' }}>Change</th>
                <th style={{ padding: isMobile ? '8px 4px' : '10px 16px', textAlign: 'right' }}>Volume</th>
              </tr>
            </thead>
            <tbody>
              {chartData.slice().reverse().map((day, index) => {
                // Get previous day for calculating change
                const prevDay = index < chartData.length - 1 ? chartData[chartData.length - index - 2] : null;
                const change = prevDay ? day.close - prevDay.close : 0;
                const changePercent = prevDay ? (change / prevDay.close) * 100 : 0;
                const isPositiveDay = change >= 0;
                
                return (
                  <tr key={day.date} style={{ 
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                    backgroundColor: index % 2 === 0 ? 'rgba(0,0,0,0.01)' : 'transparent'
                  }}>
                    <td style={{ padding: isMobile ? '8px 4px' : '10px 16px', fontWeight: 'medium' }}>
                      {new Date(day.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </td>
                    <td style={{ padding: isMobile ? '8px 4px' : '10px 16px', textAlign: 'right' }}>
                      ${formatPrice(day.open)}
                    </td>
                    <td style={{ padding: isMobile ? '8px 4px' : '10px 16px', textAlign: 'right' }}>
                      ${formatPrice(day.high)}
                    </td>
                    <td style={{ padding: isMobile ? '8px 4px' : '10px 16px', textAlign: 'right' }}>
                      ${formatPrice(day.low)}
                    </td>
                    <td style={{ padding: isMobile ? '8px 4px' : '10px 16px', textAlign: 'right', fontWeight: 'bold' }}>
                      ${formatPrice(day.close)}
                    </td>
                    <td style={{ 
                      padding: isMobile ? '8px 4px' : '10px 16px', 
                      textAlign: 'right',
                      color: isPositiveDay ? '#22c55e' : '#ef4444'
                    }}>
                      {isPositiveDay ? '+' : ''}${formatPrice(change)} ({isPositiveDay ? '+' : ''}
                      {changePercent.toFixed(2)}%)
                    </td>
                    <td style={{ padding: isMobile ? '8px 4px' : '10px 16px', textAlign: 'right' }}>
                      {new Intl.NumberFormat('en-US').format(day.volume)}
                    </td>
                  </tr>
                );
              }).slice(0, isMobile ? 10 : 20)} {/* Show fewer rows on mobile */}
            </tbody>
          </table>
        </Box>
        
        {isMobile && chartData.length > 10 && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Showing the 10 most recent trading days. Scroll right to see all data.
            </Typography>
          </Box>
        )}
      </Paper>
      
      {/* Additional data section with responsive layout */}
      <Grid container spacing={isMobile ? 1 : 3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: isMobile ? 2 : 3, borderRadius: 2 }}>
            <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom fontWeight="600">
              About {stockData?.name}
            </Typography>
            <Typography variant="body2" paragraph>
              {stockData?.name} ({stockData?.symbol}) is a {stockData?.isIndian ? 'Indian' : 'US'} based company 
              trading on the {stockData?.isIndian ? 'NSE/BSE' : 'NASDAQ/NYSE'}.
            </Typography>
            <Chip 
              label={stockData?.isIndian ? 'Indian Stock' : 'International Stock'} 
              size="small" 
              color="primary" 
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: isMobile ? 2 : 3, borderRadius: 2 }}>
            <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom fontWeight="600">
              Trading Summary
            </Typography>
            <Typography variant="body2" gutterBottom>
              {stockData?.change >= 0 ? 'Bullish' : 'Bearish'} trend with 
              {stockData?.change >= 0 ? ' positive' : ' negative'} momentum.
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip 
                icon={stockData?.change >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                label={stockData?.change >= 0 ? 'Buy' : 'Sell'} 
                size="small" 
                color={stockData?.change >= 0 ? 'success' : 'error'} 
                sx={{ mr: 1 }}
              />
              <Chip 
                label="Day Trading" 
                size="small" 
                variant="outlined"
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default StockDetailPage; 
