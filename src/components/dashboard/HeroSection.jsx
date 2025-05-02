import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Paper, 
  useTheme,
  Chip,
  Divider,
  alpha
} from '@mui/material';
import { 
  ShowChart as ShowChartIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  Bolt as BoltIcon,
  Language as LanguageIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import './animations.css';

const HeroSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // Simulated market stats that cycle through
  const marketStats = [
    { label: 'S&P 500', value: '4,927.11', change: '+0.84%', isPositive: true },
    { label: 'NASDAQ', value: '15,628.95', change: '+1.12%', isPositive: true },
    { label: 'DOW', value: '38,239.98', change: '+0.56%', isPositive: true },
    { label: 'BTC/USD', value: '$63,482.15', change: '-2.13%', isPositive: false },
    { label: 'EUR/USD', value: '1.0672', change: '+0.23%', isPositive: true },
  ];
  
  // Auto-rotate through stats
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCount((prevCount) => (prevCount + 1) % marketStats.length);
        setIsVisible(true);
      }, 500);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [marketStats.length]);
  
  // Features for the hero section
  const features = [
    { 
      icon: <ShowChartIcon />, 
      title: 'Real-time Analytics', 
      description: 'Track market movements as they happen with our powerful real-time dashboard.',
      color: theme.palette.primary.main
    },
    { 
      icon: <BoltIcon />, 
      title: 'Fast Insights', 
      description: 'Get instant stock analysis and key performance indicators at a glance.',
      color: theme.palette.warning.main
    },
    { 
      icon: <LanguageIcon />, 
      title: 'Global Markets', 
      description: 'Access markets worldwide with comprehensive data from major exchanges.',
      color: theme.palette.success.main
    },
  ];

  const handleExploreMarkets = () => {
    const sectorElement = document.getElementById('sector-performance');
    if (sectorElement) {
      sectorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        py: 6,
        mb: 6,
        borderRadius: 4,
        overflow: 'hidden',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(145deg, rgba(15,25,55,0.9) 0%, rgba(20,40,80,0.9) 100%)' 
          : 'linear-gradient(145deg, rgba(240,249,255,0.9) 0%, rgba(220,235,255,0.9) 100%)',
      }}
      className="background-pulse"
    >
      {/* Background elements */}
      <Box 
        className="glow-effect"
        sx={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: alpha(theme.palette.primary.main, 0.2),
          filter: 'blur(80px)',
          top: '-100px',
          left: '10%',
          zIndex: 0
        }}
      />
      <Box 
        className="enhanced-float"
        sx={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: alpha(theme.palette.secondary.main, 0.15),
          filter: 'blur(60px)',
          bottom: '-50px',
          right: '15%',
          zIndex: 0
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Hero Text Content */}
          <Grid item xs={12} md={7} className="text-reveal text-reveal-1">
            <Box>
              <Typography 
                variant="h5" 
                component="div" 
                color="primary"
                sx={{ 
                  fontWeight: 700, 
                  display: 'inline-flex',
                  alignItems: 'center',
                  mb: 2,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                }}
              >
                <TrendingUpIcon sx={{ mr: 1 }} />
                Market Intelligence Platform
              </Typography>
              
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 3,
                  background: theme.palette.mode === 'dark' 
                    ? 'linear-gradient(90deg, #fff, #c2d6ff)' 
                    : 'linear-gradient(90deg, #1a237e, #1976d2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  letterSpacing: -0.5,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Smarter Investing.<br />
                Better Decisions.
              </Typography>
              
              <Typography 
                variant="h6" 
                component="div" 
                color="text.secondary"
                sx={{ 
                  mb: 4, 
                  maxWidth: '90%',
                  lineHeight: 1.6
                }}
              >
                Gain the edge in your investment strategy with real-time market data, 
                advanced analytics, and personalized insights tailored to your financial goals.
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                <Button 
                  variant="contained" 
                  size="large"
                  startIcon={<VisibilityIcon />}
                  className="button-hover-effect"
                  onClick={handleExploreMarkets}
                  sx={{ 
                    px: 3, 
                    py: 1.5, 
                    borderRadius: 2,
                    fontWeight: 600
                  }}
                >
                  Explore Markets
                </Button>
                
                <Button 
                  variant="outlined" 
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  className="button-hover-effect"
                  onClick={() => navigate('/stocks')}
                  sx={{ 
                    px: 3, 
                    py: 1.5, 
                    borderRadius: 2,
                    fontWeight: 600
                  }}
                >
                  Start Trading
                </Button>
              </Box>
              
              {/* Market Stats */}
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(10px)',
                  width: 'fit-content',
                  minWidth: 240,
                  maxWidth: '100%'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Market Snapshot
                  </Typography>
                  <Box 
                    sx={{ 
                      width: 8, 
                      height: 8, 
                      bgcolor: 'success.main', 
                      borderRadius: '50%', 
                      ml: 1,
                      animation: 'pulse 2s infinite'
                    }} 
                  />
                </Box>
                
                {/* Animated stats that cycle */}
                <Box sx={{ minHeight: 70, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    opacity: isVisible ? 1 : 0, 
                    transition: 'opacity 0.5s ease',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                      {marketStats[count].value}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <Typography variant="body2" sx={{ mr: 1, fontWeight: 600 }}>
                        {marketStats[count].label}
                      </Typography>
                      <Chip 
                        label={marketStats[count].change} 
                        size="small"
                        sx={{ 
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor: marketStats[count].isPositive ? 'success.light' : 'error.light',
                          color: marketStats[count].isPositive ? 'success.dark' : 'error.dark',
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
          
          {/* Feature Cards */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {features.map((feature, index) => (
                <Paper
                  key={feature.title}
                  elevation={1}
                  className={`text-reveal text-reveal-${index + 2} shimmer-effect`}
                  sx={{ 
                    p: 2.5, 
                    borderRadius: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Box 
                      sx={{ 
                        mr: 2,
                        color: 'white',
                        backgroundColor: feature.color,
                        p: 1.2,
                        borderRadius: 2,
                        display: 'flex',
                        '& svg': {
                          fontSize: 28
                        }
                      }}
                      className="bounce-animation"
                    >
                      {feature.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection; 