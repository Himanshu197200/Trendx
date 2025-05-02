import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Tabs, 
  Tab, 
  Divider,
  Button,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Chip,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  Wallet as WalletIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  History as HistoryIcon,
  LocalOffer as LocalOfferIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import '../components/dashboard/animations.css';

const PortfolioPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [timeFrame, setTimeFrame] = useState('1M');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleTimeFrameChange = (frame) => {
    setTimeFrame(frame);
  };
  
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // Sample portfolio data
  const portfolioValue = 157842.63;
  const portfolioChange = 2845.38;
  const portfolioChangePercent = 1.84;
  const isPositiveChange = portfolioChange >= 0;
  
  // Sample portfolio distribution data
  const portfolioDistribution = [
    { name: 'Technology', value: 45, color: '#1976d2' },
    { name: 'Healthcare', value: 20, color: '#2196f3' },
    { name: 'Finance', value: 15, color: '#03a9f4' },
    { name: 'Consumer', value: 10, color: '#00bcd4' },
    { name: 'Energy', value: 10, color: '#4caf50' },
  ];
  
  // Sample performance data
  const performanceData = [
    { date: 'Jan', value: 132000 },
    { date: 'Feb', value: 138000 },
    { date: 'Mar', value: 129000 },
    { date: 'Apr', value: 139000 },
    { date: 'May', value: 142000 },
    { date: 'Jun', value: 148000 },
    { date: 'Jul', value: 151000 },
    { date: 'Aug', value: 155000 },
    { date: 'Sep', value: 152000 },
    { date: 'Oct', value: 148000 },
    { date: 'Nov', value: 154000 },
    { date: 'Dec', value: 157000 },
  ];
  
  // Sample holdings data
  const holdingsData = [
    { 
      id: 1, 
      name: 'Apple Inc.', 
      symbol: 'AAPL', 
      logo: 'https://logo.clearbit.com/apple.com',
      quantity: 50, 
      avgPrice: 150.25, 
      currentPrice: 175.42, 
      change: 2.3, 
      value: 8771.00,
      allocation: 15.2,
      sector: 'Technology'
    },
    { 
      id: 2, 
      name: 'Microsoft Corp', 
      symbol: 'MSFT', 
      logo: 'https://logo.clearbit.com/microsoft.com',
      quantity: 30, 
      avgPrice: 220.50, 
      currentPrice: 280.75, 
      change: 1.8, 
      value: 8422.50,
      allocation: 14.6,
      sector: 'Technology'
    },
    { 
      id: 3, 
      name: 'Amazon.com Inc', 
      symbol: 'AMZN', 
      logo: 'https://logo.clearbit.com/amazon.com',
      quantity: 15, 
      avgPrice: 1800.25, 
      currentPrice: 2250.10, 
      change: -0.5, 
      value: 33751.50,
      allocation: 12.8,
      sector: 'Consumer'
    },
    { 
      id: 4, 
      name: 'Tesla Inc', 
      symbol: 'TSLA', 
      logo: 'https://logo.clearbit.com/tesla.com',
      quantity: 25, 
      avgPrice: 600.50, 
      currentPrice: 723.25, 
      change: 3.2, 
      value: 18081.25,
      allocation: 10.5,
      sector: 'Automotive'
    },
    { 
      id: 5, 
      name: 'JPMorgan Chase', 
      symbol: 'JPM', 
      logo: 'https://logo.clearbit.com/jpmorganchase.com',
      quantity: 40, 
      avgPrice: 120.75, 
      currentPrice: 146.20, 
      change: -1.2, 
      value: 5848.00,
      allocation: 8.2,
      sector: 'Finance'
    },
  ];
  
  // Sample transactions data
  const transactionsData = [
    {
      id: 1,
      date: '2023-12-15',
      type: 'BUY',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      quantity: 10,
      price: 175.42,
      total: 1754.20,
      status: 'completed'
    },
    {
      id: 2,
      date: '2023-12-10',
      type: 'SELL',
      symbol: 'TSLA',
      name: 'Tesla Inc',
      quantity: 5,
      price: 720.50,
      total: 3602.50,
      status: 'completed'
    },
    {
      id: 3,
      date: '2023-12-05',
      type: 'BUY',
      symbol: 'MSFT',
      name: 'Microsoft Corp',
      quantity: 8,
      price: 280.75,
      total: 2246.00,
      status: 'completed'
    },
    {
      id: 4,
      date: '2023-11-28',
      type: 'BUY',
      symbol: 'AMZN',
      name: 'Amazon.com Inc',
      quantity: 3,
      price: 2250.10,
      total: 6750.30,
      status: 'completed'
    },
    {
      id: 5,
      date: '2023-11-20',
      type: 'SELL',
      symbol: 'JPM',
      name: 'JPMorgan Chase',
      quantity: 15,
      price: 146.20,
      total: 2193.00,
      status: 'completed'
    },
  ];
  
  // Time frames
  const timeFrames = ['1W', '1M', '3M', '6M', 'YTD', '1Y', '5Y', 'All'];

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 2 }} className="text-reveal text-reveal-1">
        My Portfolio
      </Typography>
      
      <Box sx={{ mb: 4 }} className="text-reveal text-reveal-2">
        <Grid container spacing={3}>
          {/* Portfolio Value Card */}
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 3, 
                height: '100%',
                borderRadius: 2,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(45deg, rgba(25, 118, 210, 0.05) 0%, rgba(66, 165, 245, 0.05) 100%)' 
                  : 'linear-gradient(45deg, rgba(25, 118, 210, 0.03) 0%, rgba(66, 165, 245, 0.03) 100%)'
              }}
              className="shimmer-effect"
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Total Portfolio Value
                  </Typography>
                  <Typography variant="h3" component="div" sx={{ fontWeight: 700 }}>
                    ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        color: isPositiveChange ? 'success.main' : 'error.main',
                        bgcolor: isPositiveChange ? 'success.light' : 'error.light',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        opacity: 0.8
                      }}
                    >
                      {isPositiveChange ? <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} /> : <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />}
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {isPositiveChange ? '+' : ''}{portfolioChangePercent}%
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ ml: 2, color: isPositiveChange ? 'success.main' : 'error.main', fontWeight: 500 }}>
                      {isPositiveChange ? '+' : ''}${portfolioChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} today
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <IconButton onClick={handleMenuOpen} aria-label="more options">
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>Download Report</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Share Portfolio</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Portfolio Settings</MenuItem>
                  </Menu>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {timeFrames.map((frame) => (
                    <Button 
                      key={frame}
                      onClick={() => handleTimeFrameChange(frame)}
                      variant={timeFrame === frame ? 'contained' : 'text'}
                      size="small"
                      sx={{ 
                        minWidth: 40, 
                        mx: 0.5,
                        borderRadius: 1,
                        fontWeight: 600
                      }}
                    >
                      {frame}
                    </Button>
                  ))}
                </Box>
              </Box>
              
              <Box sx={{ height: 250, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={performanceData}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }} 
                      axisLine={{ stroke: theme.palette.divider }} 
                      tickLine={{ stroke: theme.palette.divider }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} 
                      tick={{ fontSize: 12 }}
                      axisLine={{ stroke: theme.palette.divider }}
                      tickLine={{ stroke: theme.palette.divider }}
                    />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
                      labelFormatter={(label) => `Date: ${label}`}
                      contentStyle={{ 
                        backgroundColor: theme.palette.background.paper,
                        borderColor: theme.palette.divider,
                        borderRadius: 8
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke={theme.palette.primary.main} 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
          
          {/* Portfolio Distribution Card */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 3, 
                height: '100%',
                borderRadius: 2,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(45deg, rgba(25, 118, 210, 0.05) 0%, rgba(66, 165, 245, 0.05) 100%)' 
                  : 'linear-gradient(45deg, rgba(25, 118, 210, 0.03) 0%, rgba(66, 165, 245, 0.03) 100%)'
              }}
              className="shimmer-effect"
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Portfolio Distribution
              </Typography>
              
              <Box sx={{ height: 220, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {portfolioDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Allocation']}
                      contentStyle={{ 
                        backgroundColor: theme.palette.background.paper,
                        borderColor: theme.palette.divider,
                        borderRadius: 8
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                {portfolioDistribution.map((item) => (
                  <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        bgcolor: item.color,
                        mr: 1 
                      }} 
                    />
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>{item.name}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.value}%</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      
      {/* Tabs for Holdings and Transactions */}
      <Box sx={{ width: '100%', mb: 4 }} className="text-reveal text-reveal-3">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="portfolio tabs"
            sx={{ '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' } }}
          >
            <Tab 
              label="Holdings" 
              icon={<WalletIcon />} 
              iconPosition="start" 
              sx={{ fontWeight: 600, textTransform: 'none' }} 
            />
            <Tab 
              label="Transactions" 
              icon={<HistoryIcon />} 
              iconPosition="start" 
              sx={{ fontWeight: 600, textTransform: 'none' }} 
            />
          </Tabs>
        </Box>
        
        {/* Holdings Tab */}
        <Box role="tabpanel" hidden={tabValue !== 0} sx={{ mt: 3 }}>
          {tabValue === 0 && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                  Stock Holdings
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  className="button-hover-effect"
                >
                  Add New Position
                </Button>
              </Box>
              
              <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Table>
                  <TableHead sx={{ bgcolor: 'action.hover' }}>
                    <TableRow>
                      <TableCell>Company</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Avg. Price</TableCell>
                      <TableCell>Current Price</TableCell>
                      <TableCell>Change</TableCell>
                      <TableCell>Value</TableCell>
                      <TableCell>Allocation</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {holdingsData.map((row) => {
                      const gainLoss = row.currentPrice - row.avgPrice;
                      const gainLossPercent = (gainLoss / row.avgPrice) * 100;
                      const isProfit = gainLoss >= 0;
                      
                      return (
                        <TableRow 
                          key={row.id}
                          hover
                          className="scale-animation"
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar 
                                src={row.logo} 
                                sx={{ width: 28, height: 28, mr: 1.5 }}
                                variant="rounded"
                              >
                                {row.symbol.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {row.symbol}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {row.name}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>{row.quantity}</TableCell>
                          <TableCell>${row.avgPrice.toFixed(2)}</TableCell>
                          <TableCell>${row.currentPrice.toFixed(2)}</TableCell>
                          <TableCell>
                            <Box 
                              sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                color: row.change >= 0 ? 'success.main' : 'error.main'
                              }}
                            >
                              {row.change >= 0 ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {row.change >= 0 ? '+' : ''}{row.change}%
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              ${row.value.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={row.allocation} 
                                sx={{ 
                                  width: 60,
                                  height: 6,
                                  borderRadius: 3
                                }}
                              />
                              <Typography variant="body2">
                                {row.allocation}%
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Button 
                              variant="outlined" 
                              size="small" 
                              color="primary"
                              sx={{ mr: 1, borderRadius: 2 }}
                            >
                              Buy
                            </Button>
                            <Button 
                              variant="outlined" 
                              size="small" 
                              color="error"
                              sx={{ borderRadius: 2 }}
                            >
                              Sell
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Box>
        
        {/* Transactions Tab */}
        <Box role="tabpanel" hidden={tabValue !== 1} sx={{ mt: 3 }}>
          {tabValue === 1 && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                  Recent Transactions
                </Typography>
                <Button 
                  variant="outlined" 
                  startIcon={<LocalOfferIcon />}
                >
                  Export Transactions
                </Button>
              </Box>
              
              <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Table>
                  <TableHead sx={{ bgcolor: 'action.hover' }}>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Symbol</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactionsData.map((transaction) => (
                      <TableRow 
                        key={transaction.id}
                        hover
                        className="scale-animation"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(transaction.date).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={transaction.type} 
                            size="small"
                            sx={{ 
                              bgcolor: transaction.type === 'BUY' ? 'success.light' : 'error.light',
                              color: transaction.type === 'BUY' ? 'success.dark' : 'error.dark',
                              fontWeight: 600
                            }} 
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {transaction.symbol}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{transaction.quantity}</TableCell>
                        <TableCell>${transaction.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            ${transaction.total.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)} 
                            size="small"
                            sx={{ 
                              bgcolor: 'primary.light',
                              color: 'primary.dark',
                              fontWeight: 500
                            }} 
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default PortfolioPage; 