import React, { useState, useEffect } from 'react';
import { 
  Container, Box, Typography, Paper, Divider, Grid, Chip,
  Card, CardContent, CardActionArea, Tab, Tabs, CircularProgress,
  Button, Breadcrumbs, Link as MuiLink
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ArticleIcon from '@mui/icons-material/Article';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getMockNewsData, formatNewsDate, getSentimentColor } from '../utils/NewsUtils';
import NewsDetailModal from '../components/news/NewsDetailModal';

function NewsPage() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      
      // In a real app, use a real API with the category parameter
      // For demo purposes, we're using mock data
      const mockNews = getMockNewsData();
      
      // Filter by category if not 'all'
      let filteredNews = mockNews;
      if (category === 'markets') {
        filteredNews = mockNews.filter(item => 
          item.symbols.some(sym => ['SPY', 'QQQ', 'DIA', 'NIFTY'].includes(sym))
        );
      } else if (category === 'stocks') {
        filteredNews = mockNews.filter(item => 
          item.symbols.some(sym => !['SPY', 'QQQ', 'DIA', 'NIFTY'].includes(sym))
        );
      }
      
      // Simulate network delay
      setTimeout(() => {
        setNews(filteredNews);
        setLoading(false);
        setRefreshing(false);
      }, 800);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to fetch news. Please try again later.');
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNews();
  };

  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
  };

  const handleNewsClick = (newsItem) => {
    setSelectedNews(newsItem);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedNews(null);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 2 }}>
          <MuiLink component={Link} to="/" underline="hover" color="inherit">
            Home
          </MuiLink>
          <Typography color="text.primary">News</Typography>
        </Breadcrumbs>
        
        <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ArticleIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h5" fontWeight="600">
                Market News
              </Typography>
              <Chip 
                label="LIVE" 
                color="error" 
                size="small" 
                icon={<NewReleasesIcon />} 
                sx={{ ml: 2, fontWeight: 'bold' }} 
              />
            </Box>
            
            <Button 
              startIcon={refreshing ? <CircularProgress size={16} /> : <RefreshIcon />}
              onClick={handleRefresh}
              disabled={refreshing}
              variant="outlined"
              size="small"
            >
              Refresh
            </Button>
          </Box>
          
          <Tabs
            value={category}
            onChange={handleCategoryChange}
            sx={{ mb: 2 }}
          >
            <Tab value="all" label="All News" />
            <Tab value="markets" label="Market Updates" />
            <Tab value="stocks" label="Stock News" />
          </Tabs>
          
          <Divider sx={{ mb: 3 }} />
          
          {loading && !refreshing ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" sx={{ py: 4, textAlign: 'center' }}>
              {error}
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {news.map((item) => {
                const isPositive = item.sentiment?.polarity > 0;
                const TrendIcon = isPositive ? TrendingUpIcon : TrendingDownIcon;
                const sentimentColor = getSentimentColor(item.sentiment);
                
                return (
                  <Grid item xs={12} md={6} key={item.uuid}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        height: '100%',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <CardActionArea 
                        onClick={() => handleNewsClick(item)}
                        sx={{ height: '100%' }}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              {item.source} • {formatNewsDate(item.published_at)}
                            </Typography>
                            
                            {item.sentiment && (
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TrendIcon sx={{ fontSize: 16, mr: 0.5, color: sentimentColor }} />
                                <Typography variant="caption" sx={{ color: sentimentColor, fontWeight: 'bold' }}>
                                  {isPositive ? 'Bullish' : 'Bearish'}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                          
                          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                            {item.title}
                          </Typography>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {item.description}
                          </Typography>
                          
                          {item.symbols && (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {item.symbols.map((symbol, idx) => (
                                <Chip 
                                  key={idx} 
                                  label={symbol} 
                                  size="small" 
                                  variant="outlined"
                                  sx={{ fontSize: '0.7rem' }}
                                />
                              ))}
                            </Box>
                          )}
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Paper>
      </Container>

      {/* News Detail Modal */}
      <NewsDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        newsItem={selectedNews}
      />
    </>
  );
}

export default NewsPage; 