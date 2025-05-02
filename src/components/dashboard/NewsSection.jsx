import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Card, 
  CardContent, 
  CardActionArea,
  Grid,
  Chip,
  Link,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  Article as ArticleIcon,
  Bookmark as BookmarkIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  NewReleases as NewReleasesIcon
} from '@mui/icons-material';

// API key (free tier from Marketaux)
const API_KEY = 'demo'; // Replace with your actual API key after signing up

function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
    
    // Refresh news every 5 minutes
    const refreshInterval = setInterval(() => {
      fetchNews();
    }, 300000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      
      // Using Marketaux API for financial news
      const response = await fetch(
        `https://api.marketaux.com/v1/news/all?symbols=AAPL,MSFT,AMZN,GOOGL,TSLA,META,NIFTY,RELIANCE.NS&filter_entities=true&language=en&api_token=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      const data = await response.json();
      
      if (data && data.data) {
        setNews(data.data.slice(0, 10)); // Display top 10 news items
      } else {
        // Fallback to mock data if the API response is not as expected
        setNews(getMockNewsData());
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Unable to load latest financial news. Using sample data instead.');
      setNews(getMockNewsData());
    } finally {
      setLoading(false);
    }
  };

  // Get sentiment color based on score
  const getSentimentColor = (sentiment) => {
    if (!sentiment) return 'text.secondary';
    
    const score = sentiment.polarity || 0;
    if (score > 0.3) return 'success.main';
    if (score < -0.3) return 'error.main';
    return 'warning.main';
  };

  // Format news publication date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2, height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Paper>
    );
  }

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
          <ArticleIcon sx={{ mr: 1 }} /> Market News
        </Typography>
        <Chip 
          label="LIVE" 
          color="error" 
          size="small" 
          icon={<NewReleasesIcon />} 
          sx={{ fontWeight: 'bold' }} 
        />
      </Box>
      
      {error && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={2}>
        {news.map((item, index) => {
          const sentimentColor = getSentimentColor(item.sentiment);
          const hasSentiment = item.sentiment && item.sentiment.polarity;
          const isPositive = hasSentiment && item.sentiment.polarity > 0;
          const TrendIcon = isPositive ? TrendingUpIcon : TrendingDownIcon;
          
          return (
            <Grid item xs={12} key={item.uuid || index}>
              <Card variant="outlined" sx={{ mb: 1 }}>
                <CardActionArea component={Link} href={item.url} target="_blank" rel="noopener">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {item.source || 'Financial News'} • {formatDate(item.published_at || new Date())}
                      </Typography>
                      
                      {hasSentiment && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TrendIcon sx={{ fontSize: 16, mr: 0.5, color: sentimentColor }} />
                          <Typography variant="caption" sx={{ color: sentimentColor, fontWeight: 'bold' }}>
                            {isPositive ? 'Bullish' : 'Bearish'}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                      {item.title}
                    </Typography>
                    
                    {item.symbols && item.symbols.length > 0 && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                        {item.symbols.map((symbol, i) => (
                          <Chip 
                            key={i} 
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
    </Paper>
  );
}

// Mock data in case API fails
const getMockNewsData = () => [
  {
    uuid: '1',
    title: 'Federal Reserve Signals Potential Rate Cut in Coming Months',
    description: 'The Federal Reserve indicated it may start cutting interest rates soon as inflation pressures ease.',
    published_at: new Date().toISOString(),
    source: 'Market News',
    url: 'https://example.com/news/1',
    symbols: ['SPY', 'QQQ', 'DIA'],
    sentiment: { polarity: 0.65, neg: 0.1, neu: 0.25, pos: 0.65 }
  },
  {
    uuid: '2',
    title: 'Apple Unveils New AI Features for iPhone at Developer Conference',
    description: 'Apple announced major AI enhancements coming to iPhone in its latest software update.',
    published_at: new Date(Date.now() - 3600000).toISOString(),
    source: 'Tech Report',
    url: 'https://example.com/news/2',
    symbols: ['AAPL', 'MSFT', 'GOOGL'],
    sentiment: { polarity: 0.45, neg: 0.15, neu: 0.4, pos: 0.45 }
  },
  {
    uuid: '3',
    title: 'Oil Prices Drop as Global Demand Forecasts Weaken',
    description: 'Crude oil prices fell sharply as economic data suggested weaker demand outlook.',
    published_at: new Date(Date.now() - 7200000).toISOString(),
    source: 'Energy Insider',
    url: 'https://example.com/news/3',
    symbols: ['USO', 'XOM', 'CVX'],
    sentiment: { polarity: -0.55, neg: 0.55, neu: 0.35, pos: 0.1 }
  },
  {
    uuid: '4',
    title: 'Reliance Industries Reports Strong Quarterly Growth',
    description: 'Indian conglomerate Reliance Industries posted better-than-expected quarterly results.',
    published_at: new Date(Date.now() - 10800000).toISOString(),
    source: 'India Business',
    url: 'https://example.com/news/4',
    symbols: ['RELIANCE.NS', 'NIFTY'],
    sentiment: { polarity: 0.7, neg: 0.05, neu: 0.25, pos: 0.7 }
  },
  {
    uuid: '5',
    title: 'Tesla Recalls 200,000 Vehicles Over Software Issue',
    description: 'Electric vehicle maker Tesla announced a recall affecting several of its models.',
    published_at: new Date(Date.now() - 18000000).toISOString(),
    source: 'Auto News',
    url: 'https://example.com/news/5',
    symbols: ['TSLA'],
    sentiment: { polarity: -0.4, neg: 0.4, neu: 0.5, pos: 0.1 }
  }
];

export default NewsSection; 