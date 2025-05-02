import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Button, TextField, Divider, Link, useTheme } from '@mui/material';
import { 
  Twitter as TwitterIcon, 
  Facebook as FacebookIcon, 
  Instagram as InstagramIcon, 
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import '../dashboard/animations.css';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(245, 245, 245, 0.8)',
        pt: 6,
        pb: 3,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background animated elements */}
      <Box 
        className="glow-effect"
        sx={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: theme.palette.primary.main,
          opacity: 0.03,
          filter: 'blur(40px)',
          top: '-20px',
          left: '20%',
          zIndex: 0
        }}
      />
      <Box 
        className="enhanced-float"
        sx={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: theme.palette.secondary.main,
          opacity: 0.05,
          filter: 'blur(30px)',
          bottom: '10%',
          right: '10%',
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4} className="text-reveal text-reveal-1">
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              TrendX
              <Box
                component="span"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  ml: 0.5
                }}
              />
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              TrendX provides comprehensive market insights, real-time stock tracking, and advanced analytics tools for investors looking to make informed decisions in today's dynamic financial markets.
            </Typography>
            <Box sx={{ mt: 2, mb: 3 }}>
              <IconButton 
                className="scale-animation" 
                aria-label="twitter" 
                size="small"
                sx={{ 
                  mr: 1, 
                  color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  '&:hover': { color: '#1DA1F2' }
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                className="scale-animation" 
                aria-label="facebook" 
                size="small"
                sx={{ 
                  mr: 1, 
                  color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  '&:hover': { color: '#4267B2' }
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                className="scale-animation" 
                aria-label="instagram" 
                size="small"
                sx={{ 
                  mr: 1, 
                  color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  '&:hover': { color: '#C13584' }
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                className="scale-animation" 
                aria-label="linkedin" 
                size="small"
                sx={{ 
                  mr: 1, 
                  color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  '&:hover': { color: '#0077B5' }
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton 
                className="scale-animation" 
                aria-label="github" 
                size="small"
                sx={{ 
                  color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  '&:hover': { color: '#333' }
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2} className="text-reveal text-reveal-2">
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { name: 'Dashboard', path: '/' },
                { name: 'Stocks', path: '/stocks' },
                { name: 'IPOs', path: '/ipos' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'About', path: '/about' },
              ].map((link) => (
                <Link
                  key={link.name}
                  component={RouterLink}
                  to={link.path}
                  underline="none"
                  color="text.secondary"
                  sx={{ 
                    mb: 1.5, 
                    display: 'inline-block',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      color: 'primary.main',
                      transform: 'translateX(5px)'
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={2} className="text-reveal text-reveal-2">
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { name: 'Market News', path: '/news' },
                { name: 'Learning Center', path: '/learn' },
                { name: 'API Access', path: '/api' },
                { name: 'Help Center', path: '/help' },
                { name: 'Community', path: '/community' },
              ].map((link) => (
                <Link
                  key={link.name}
                  component={RouterLink}
                  to={link.path}
                  underline="none"
                  color="text.secondary"
                  sx={{ 
                    mb: 1.5, 
                    display: 'inline-block',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      color: 'primary.main',
                      transform: 'translateX(5px)'
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={4} className="text-reveal text-reveal-3">
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Subscribe to our newsletter for the latest market insights and tips.
            </Typography>
            <Box 
              component="form" 
              noValidate 
              sx={{ 
                display: 'flex',
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                borderRadius: 2,
                overflow: 'hidden',
                p: '2px',
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                }
              }}
            >
              <TextField
                size="small"
                placeholder="Your email"
                variant="standard"
                fullWidth
                sx={{ 
                  '& .MuiInputBase-root': {
                    pl: 1.5,
                    border: 'none',
                    bgcolor: 'transparent',
                    '&:before, &:after': {
                      display: 'none'
                    }
                  }
                }}
                InputProps={{
                  disableUnderline: true,
                }}
              />
              <Button 
                variant="contained" 
                className="button-hover-effect"
                sx={{ 
                  borderRadius: 1,
                  px: 2,
                  minWidth: 'auto'
                }}
              >
                <SendIcon fontSize="small" />
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, opacity: 0.2 }} />
        
        {/* Bottom footer */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} TrendX. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', mt: { xs: 2, sm: 0 } }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
              <React.Fragment key={item}>
                <Link
                  component={RouterLink}
                  to="#"
                  underline="none"
                  color="text.secondary"
                  sx={{ 
                    transition: 'color 0.2s ease',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {item}
                </Link>
                {index < 2 && (
                  <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
                    •
                  </Typography>
                )}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 