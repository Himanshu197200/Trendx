import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Typography, Box, IconButton, Badge,
  Menu, Divider, Avatar, Container, Tooltip, Chip, Tab, Tabs,
  Dialog, DialogTitle, DialogContent, DialogActions, Paper, Button,
  List, ListItem, ListItemIcon, ListItemText, Switch, styled
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ArticleIcon from '@mui/icons-material/Article';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../context/ThemeContext';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// Custom styled toggle switch
const ThemeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#ff8f00',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [unreadCount, setUnreadCount] = useState(13);
  const [tabValue, setTabValue] = useState(0);
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsDetailOpen, setNewsDetailOpen] = useState(false);
  
  // User data
  const userData = {
    name: "Himanshu Mishra",
    email: "himanshumishra4926@gmail.com",
    avatar: "H"
  };
  
  // Theme context usage with error protection
  let darkMode = false;
  let toggleTheme = () => {}; 
  
  try {
    const themeContext = useThemeMode();
    darkMode = themeContext?.mode === 'dark';
    toggleTheme = themeContext?.toggleTheme || (() => {});
  } catch (error) {
    console.error("Error using theme context:", error);
  }
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleNotificationsOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };
  
  const handleNotificationsClose = () => {
    setNotificationAnchor(null);
  };
  
  const handleProfileOpen = (event) => {
    setProfileAnchor(event.currentTarget);
  };
  
  const handleProfileClose = () => {
    setProfileAnchor(null);
  };
  
  const handleProfileNavigate = (path) => {
    navigate(path);
    handleProfileClose();
  };
  
  const handleMarkAllAsRead = () => {
    setUnreadCount(0);
    handleNotificationsClose();
  };
  
  const handleNewsClick = (news) => {
    setSelectedNews({
      ...news,
      date: 'May 2, 2025 at 04:36 AM', // Adding static date for demo
      sentiment: news.trend === 'up' ? 'Bullish' : 'Bearish'
    });
    setNewsDetailOpen(true);
    handleNotificationsClose();
  };
  
  const handleNewsDetailClose = () => {
    setNewsDetailOpen(false);
    setSelectedNews(null);
  };
  
  const handleReadFullArticle = () => {
    // Navigate to the full article page
    navigate(`/news/${selectedNews?.id}`);
    setNewsDetailOpen(false);
  };

  // Market News data - exactly like the screenshot
  const marketNews = [
    {
      id: 'news-1',
      title: 'Federal Reserve Signals Potential Rate Cut in Coming Months',
      source: 'Market News',
      description: 'The Federal Reserve indicated it may start cutting interest rates soon as inflation pressures ease.',
      symbols: ['SPY', 'QQQ', 'DIA'],
      trend: 'up'
    },
    {
      id: 'news-2',
      title: 'Apple Unveils New AI Features for iPhone at Developer Conference',
      source: 'Tech Report',
      description: 'Apple announced major AI enhancements coming to iPhone in its latest software update.',
      symbols: ['AAPL', 'MSFT', 'GOOGL'],
      trend: 'up'
    },
    {
      id: 'news-3',
      title: 'Oil Prices Drop as Global Demand Forecasts Weaken',
      source: 'Energy Insider',
      description: 'Crude oil prices fell sharply as economic data suggested weaker demand outlook.',
      symbols: ['USO', 'XOM', 'CVX'],
      trend: 'down'
    },
    {
      id: 'news-4',
      title: 'Reliance Industries Reports Strong Quarterly Growth',
      source: 'India Business',
      description: 'Indian conglomerate Reliance Industries posted better-than-expected quarterly results.',
      symbols: ['RELIANCE'],
      trend: 'up'
    }
  ];

  // Check if a navigation link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { title: 'Dashboard', path: '/' },
    { title: 'Stocks', path: '/stocks' },
    { title: 'Portfolio', path: '/portfolio' },
    { title: 'About', path: '/about' }
  ];

  return (
    <>
      <AppBar 
        position="static" 
        color="default" 
        elevation={0}
        sx={{ 
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: darkMode ? '#1a1a2e' : '#ffffff'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: '64px' }}>
            {/* Logo & Brand */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                mr: 4,
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box 
                component="span" 
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 700,
                  fontSize: '1.5rem'
                }}
              >
                TrendX
              </Box>
              <Box 
                component="span" 
                sx={{ 
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  ml: 0.5
                }}
              />
            </Typography>

            {/* Navigation Links */}
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              {navItems.map((item) => (
                <Box
                  key={item.title}
                  component={Link}
                  to={item.path}
                  sx={{
                    position: 'relative',
                    px: 2,
                    py: 2.3,
                    textDecoration: 'none',
                    color: isActive(item.path) ? 'primary.main' : (darkMode ? 'grey.300' : 'grey.700'),
                    fontWeight: isActive(item.path) ? 600 : 400,
                    fontSize: '0.95rem',
                    transition: 'all 0.2s',
                    '&:hover': {
                      color: 'primary.main',
                    },
                    '&::after': isActive(item.path) ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '3px',
                      backgroundColor: 'primary.main',
                      borderTopLeftRadius: '3px',
                      borderTopRightRadius: '3px'
                    } : {}
                  }}
                >
                  {item.title}
                </Box>
              ))}
            </Box>

            {/* Search Bar (placeholder) */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mr: 2,
                color: 'text.secondary',
                fontSize: '1.1rem'
              }}
            >
              <Box component="span" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                🔍
              </Box>
              <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                Search stocks, IPOs...
              </Typography>
            </Box>

            {/* Right side actions */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Notifications */}
              <Tooltip title="Notifications">
                <IconButton 
                  color="inherit" 
                  onClick={handleNotificationsOpen}
                  sx={{ mr: 1 }}
                >
                  <Badge 
                    badgeContent={unreadCount} 
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '0.6rem',
                        height: '16px',
                        minWidth: '16px',
                        padding: 0
                      }
                    }}
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Custom Theme Toggle Switch */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mr: 1,
                border: '1px solid',
                borderColor: darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                borderRadius: '24px',
                p: '2px 8px',
                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
              }}>
                <WbSunnyIcon 
                  fontSize="small" 
                  sx={{ 
                    mr: 0.5, 
                    color: darkMode ? 'text.disabled' : 'warning.main',
                    fontSize: '1rem'
                  }} 
                />
                <ThemeSwitch 
                  checked={darkMode}
                  onChange={toggleTheme}
                  size="small"
                />
                <NightsStayIcon 
                  fontSize="small" 
                  sx={{ 
                    ml: 0.5, 
                    color: darkMode ? 'primary.light' : 'text.disabled',
                    fontSize: '1rem'
                  }} 
                />
              </Box>

              {/* User Avatar */}
              <Tooltip title="Account">
                <IconButton 
                  onClick={handleProfileOpen}
                  sx={{ p: 0 }}
                >
                  <Avatar 
                    sx={{ 
                      width: 40, 
                      height: 40,
                      bgcolor: '#d1d1d1',
                      color: '#555',
                      fontWeight: 500,
                      fontSize: '1.1rem'
                    }}
                  >
                    {userData.avatar}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>

            {/* Market News Notifications Menu */}
            <Menu
              anchorEl={notificationAnchor}
              open={Boolean(notificationAnchor)}
              onClose={handleNotificationsClose}
              PaperProps={{
                sx: {
                  width: 400,
                  maxHeight: 'calc(100vh - 100px)',
                  overflow: 'hidden',
                  mt: 1.5,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                  '& .MuiList-root': {
                    padding: 0
                  }
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {/* Header with Market News and LIVE badge */}
              <Box sx={{ 
                p: 2, 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ArticleIcon sx={{ mr: 1.5 }} />
                  <Typography variant="h6">Market News</Typography>
                </Box>
                <Chip
                  label="LIVE"
                  color="error"
                  size="small"
                  icon={<NewReleasesIcon />}
                  sx={{ 
                    fontWeight: 'bold', 
                    borderRadius: '16px',
                    '& .MuiChip-icon': { 
                      fontSize: '1rem',
                      ml: 0.5, 
                      mr: -0.5 
                    }
                  }}
                />
              </Box>
              
              {/* Tabs for Market News and Alerts */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab 
                    icon={<ArticleIcon sx={{ fontSize: '1.1rem', mr: 1 }} />}
                    label="Market News" 
                    iconPosition="start"
                    sx={{ 
                      minHeight: 48,
                      flex: 1,
                      fontSize: '0.95rem'
                    }}
                  />
                  <Tab 
                    icon={<NotificationsActiveIcon sx={{ fontSize: '1.1rem', mr: 1 }} />}
                    label="Alerts" 
                    iconPosition="start"
                    sx={{ 
                      minHeight: 48,
                      flex: 1,
                      fontSize: '0.95rem'
                    }}
                  />
                </Tabs>
              </Box>
              
              {/* News items container with scrolling */}
              <Box 
                sx={{ 
                  maxHeight: 'calc(100vh - 250px)',
                  overflowY: 'auto',
                  pb: 1
                }}
              >
                {/* Market News Tab Content */}
                {tabValue === 0 && (
                  <>
                    {marketNews.map((news, index) => (
                      <Box 
                        key={news.id}
                        sx={{ 
                          p: 2,
                          borderBottom: index < marketNews.length - 1 ? '1px solid' : 'none',
                          borderColor: 'divider',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                          '&:hover': {
                            bgcolor: 'rgba(0,0,0,0.03)'
                          }
                        }}
                        onClick={() => handleNewsClick(news)}
                      >
                        {/* Trend indicator and title */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                          {news.trend === 'up' ? (
                            <TrendingUpIcon sx={{ color: 'success.main', mr: 1, fontSize: '1.3rem', mt: 0.2 }} />
                          ) : (
                            <TrendingDownIcon sx={{ color: 'error.main', mr: 1, fontSize: '1.3rem', mt: 0.2 }} />
                          )}
                          <Typography variant="subtitle1" fontWeight={500} lineHeight={1.3}>
                            {news.title}
                          </Typography>
                        </Box>
                        
                        {/* Source */}
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, ml: 0.5 }}>
                          {news.source}
                        </Typography>
                        
                        {/* Stock symbols */}
                        <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5, ml: 0.5 }}>
                          {news.symbols.map(symbol => (
                            <Box 
                              key={symbol}
                              component="span"
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                fontSize: '0.75rem',
                                color: 'text.secondary',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                                px: 0.75,
                                py: 0.25
                              }}
                            >
                              {symbol}
                            </Box>
                          ))}
                        </Box>
                        
                        {/* News description */}
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                          {news.description}
                        </Typography>
                      </Box>
                    ))}
                  </>
                )}
                
                {/* Alerts Tab Content */}
                {tabValue === 1 && (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      No alerts at this time
                    </Typography>
                  </Box>
                )}
              </Box>
              
              {/* Mark All as Read button */}
              <Box 
                sx={{ 
                  p: 1.5, 
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  textAlign: 'center' 
                }}
              >
                <Typography 
                  variant="button" 
                  sx={{ 
                    color: 'primary.main',
                    cursor: 'pointer',
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                  onClick={handleMarkAllAsRead}
                >
                  Mark All as Read
                </Typography>
              </Box>
            </Menu>

            {/* User Profile Menu - Matching the second image */}
            <Menu
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={handleProfileClose}
              PaperProps={{
                sx: {
                  width: 300,
                  mt: 1.5,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {/* User info section with avatar */}
              <Box sx={{ 
                py: 3, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}>
                <Avatar
                  sx={{ 
                    width: 80, 
                    height: 80,
                    bgcolor: '#d1d1d1',
                    color: '#fff',
                    fontSize: '2rem',
                    mb: 1.5
                  }}
                >
                  {userData.avatar}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {userData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {userData.email}
                </Typography>
              </Box>
              
              {/* Navigation menu options */}
              <List disablePadding>
                <ListItem 
                  button 
                  onClick={() => handleProfileNavigate('/profile')}
                  sx={{ py: 1.5 }}
                >
                  <ListItemIcon sx={{ minWidth: 44 }}>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle1">My Profile</Typography>
                    } 
                  />
                </ListItem>
                
                <ListItem 
                  button 
                  onClick={() => handleProfileNavigate('/portfolio')}
                  sx={{ py: 1.5 }}
                >
                  <ListItemIcon sx={{ minWidth: 44 }}>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle1">My Portfolio</Typography>
                    } 
                  />
                </ListItem>
                
                <ListItem 
                  button 
                  onClick={() => handleProfileNavigate('/messages')}
                  sx={{ py: 1.5 }}
                >
                  <ListItemIcon sx={{ minWidth: 44 }}>
                    <MessageIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle1">Messages</Typography>
                    } 
                  />
                </ListItem>
                
                <ListItem 
                  button 
                  onClick={() => handleProfileNavigate('/settings')}
                  sx={{ py: 1.5 }}
                >
                  <ListItemIcon sx={{ minWidth: 44 }}>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle1">Settings</Typography>
                    } 
                  />
                </ListItem>
              </List>
              
              <Divider />
              
              <ListItem 
                button 
                onClick={handleProfileClose}
                sx={{ py: 1.5 }}
              >
                <ListItemIcon sx={{ minWidth: 44 }}>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="subtitle1">Logout</Typography>
                  } 
                />
              </ListItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* News Detail Dialog - Shows when a news item is clicked */}
      <Dialog
        open={newsDetailOpen}
        onClose={handleNewsDetailClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0px 20px 60px rgba(0, 0, 0, 0.15)'
          }
        }}
      >
        {selectedNews && (
          <>
            {/* News title with close button */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                p: 3,
                pb: 1
              }}
            >
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, pr: 3 }}>
                {selectedNews.title}
              </Typography>
              <IconButton onClick={handleNewsDetailClose} sx={{ mt: -1, mr: -1 }}>
                <CloseIcon />
              </IconButton>
            </Box>
            
            {/* Source & Date */}
            <Box sx={{ px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle1" color="text.secondary">
                {selectedNews.source} • {selectedNews.date}
              </Typography>
              
              {/* Bullish/Bearish indicator */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {selectedNews.trend === 'up' ? (
                  <TrendingUpIcon sx={{ color: 'success.main', mr: 0.5 }} />
                ) : (
                  <TrendingDownIcon sx={{ color: 'error.main', mr: 0.5 }} />
                )}
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: selectedNews.trend === 'up' ? 'success.main' : 'error.main',
                    fontWeight: 500
                  }}
                >
                  {selectedNews.sentiment}
                </Typography>
              </Box>
            </Box>
            
            <DialogContent sx={{ pt: 3 }}>
              {/* Main content */}
              <Typography variant="body1" paragraph>
                {selectedNews.description}
              </Typography>
              
              {/* Related Symbols section */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Related Symbols:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  {selectedNews.symbols.map(symbol => (
                    <Chip
                      key={symbol}
                      label={symbol}
                      variant="outlined"
                      size="small"
                      sx={{ 
                        borderRadius: '16px',
                        fontWeight: 500
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </DialogContent>
            
            <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'flex-end' }}>
              <Button 
                variant="outlined" 
                onClick={handleNewsDetailClose}
                sx={{ minWidth: 100 }}
              >
                Close
              </Button>
              <Button 
                variant="contained" 
                onClick={handleReadFullArticle}
                startIcon={<OpenInNewIcon />}
                sx={{ minWidth: 180 }}
              >
                Read Full Article
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}

export default NavBar;