// This is the home page of our application
import { useState } from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import StocksList from '../components/stocks/StocksList';
import MarketOverview from '../components/dashboard/MarketOverview';
import HomeBanner from '../components/dashboard/HomeBanner';
import HeroSection from '../components/dashboard/HeroSection';

function Dashboard() {
  // Always set initial viewMode to 'grid'
  const [viewMode, setViewMode] = useState('grid');
  
  return (
    <Container maxWidth="xl">
      {/* Main welcome banner */}
      <HeroSection />
      
      {/* Featured content or announcements */}
      <Box sx={{ mb: 4 }}>
        <HomeBanner />
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {/* Market summary and sector performance */}
          <Box id="sector-performance" sx={{ mb: 4 }}>
            <MarketOverview />
          </Box>
          
          {/* List of trending or popular stocks */}
          <Box sx={{ mb: 6 }}>
            <StocksList viewMode={viewMode} setViewMode={setViewMode} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;