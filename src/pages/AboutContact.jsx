import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  Divider, 
  Link, 
  Snackbar,
  Alert,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon,
  Send as SendIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  GitHub as GitHubIcon,
  Language as LanguageIcon,
  BusinessCenter as BusinessCenterIcon,
  Timeline as TimelineIcon,
  ShowChart as ShowChartIcon,
  FormatQuote as FormatQuoteIcon
} from '@mui/icons-material';

function AboutContact() {
  const theme = useTheme();
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formValues.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formValues.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (!formValues.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formValues.message.trim()) {
      errors.message = 'Message is required';
    } else if (formValues.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // In a real app, you would submit the form to your backend
    console.log('Form submitted:', formValues);
    
    // Show success message
    setSnackbarOpen(true);
    
    // Reset form
    setFormValues({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  return (
    <Container maxWidth="xl">
      <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 4 }}>
        About TrendX
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              Our Mission
            </Typography>
            
            <Box sx={{ position: 'relative', mb: 3 }}>
              <FormatQuoteIcon 
                sx={{ 
                  position: 'absolute', 
                  fontSize: 60, 
                  color: 'primary.light', 
                  opacity: 0.3, 
                  top: -10, 
                  left: -15 
                }}
              />
              <Typography variant="h6" sx={{ ml: 4, fontStyle: 'italic', color: 'text.secondary' }}>
                To democratize financial markets data and empower investors with actionable insights and real-time analytics.
              </Typography>
            </Box>
            
            <Typography variant="body1" paragraph>
              TrendX is a cutting-edge stock market dashboard designed to provide retail investors with professional-grade market analytics and data visualization tools. We believe that access to high-quality financial data should not be limited to institutional investors.
            </Typography>
            
            <Typography variant="body1" paragraph>
              Founded in 2023, TrendX has quickly become the go-to platform for traders and investors looking to make informed decisions based on comprehensive market data, intuitive charts, and real-time stock information.
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              Why Choose TrendX?
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ height: '100%', backgroundColor: 'background.paper' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      <ShowChartIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Real-Time Data
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      Get access to real-time stock quotes, interactive charts, and market indices to stay ahead of market movements.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Card sx={{ height: '100%', backgroundColor: 'background.paper' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      <TimelineIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Advanced Analytics
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      Leverage powerful technical indicators, fundamental analysis tools, and historical data comparison.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Card sx={{ height: '100%', backgroundColor: 'background.paper' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      <LanguageIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Global Markets
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      Track stocks, indices, and financial instruments from markets around the world in one unified platform.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Card sx={{ height: '100%', backgroundColor: 'background.paper' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      <BusinessCenterIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Investment Tools
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      Discover upcoming IPOs, track market movers, and get personalized watchlists tailored to your investment strategy.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
              Contact Us
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <List disablePadding>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email" 
                      secondary={
                        <Link href="mailto:himanshumishra4926@gmail.com" underline="hover" color="inherit">
                          himanshumishra4926@gmail.com
                        </Link>
                      }
                    />
                  </ListItem>
                  
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <PhoneIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Phone" 
                      secondary="+91 (11) 4567-8900"
                    />
                  </ListItem>
                  
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <LocationIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Address" 
                      secondary="Revell Orchid, Lohegaon, Pune, India - 411047"
                    />
                  </ListItem>
                </List>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  <Link href="https://twitter.com/Himanshu197200" target="_blank" rel="noopener">
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        transition: 'all 0.2s ease',
                        '&:hover': { bgcolor: 'primary.dark', transform: 'scale(1.1)' }
                      }}
                    >
                      <TwitterIcon />
                    </Avatar>
                  </Link>
                  
                  <Link href="https://linkedin.com/in/himanshu-mishra-a5a8aa22a" target="_blank" rel="noopener">
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        transition: 'all 0.2s ease',
                        '&:hover': { bgcolor: 'primary.dark', transform: 'scale(1.1)' }
                      }}
                    >
                      <LinkedInIcon />
                    </Avatar>
                  </Link>
                  
                  <Link href="https://facebook.com/profile.php?id=100009246070694" target="_blank" rel="noopener">
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        transition: 'all 0.2s ease',
                        '&:hover': { bgcolor: 'primary.dark', transform: 'scale(1.1)' }
                      }}
                    >
                      <FacebookIcon />
                    </Avatar>
                  </Link>
                  
                  <Link href="https://github.com/Himanshu197200" target="_blank" rel="noopener">
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        transition: 'all 0.2s ease',
                        '&:hover': { bgcolor: 'primary.dark', transform: 'scale(1.1)' }
                      }}
                    >
                      <GitHubIcon />
                    </Avatar>
                  </Link>
                </Box>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Get in Touch
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    label="Your Name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                    required
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="email"
                    label="Email Address"
                    value={formValues.email}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                    required
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    type="email"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    name="subject"
                    label="Subject"
                    value={formValues.subject}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                    required
                    error={!!formErrors.subject}
                    helperText={formErrors.subject}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    name="message"
                    label="Message"
                    value={formValues.message}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                    required
                    multiline
                    rows={4}
                    error={!!formErrors.message}
                    helperText={formErrors.message}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon />}
                    sx={{ mt: 1 }}
                    fullWidth
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Thank you for your message! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AboutContact; 