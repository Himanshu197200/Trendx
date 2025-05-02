import React from 'react';
import { 
  Container, Box, Typography, Paper, Divider, Chip, 
  Button, Breadcrumbs, Link as MuiLink
} from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

function NewsArticlePage() {
  const { newsId } = useParams();
  const navigate = useNavigate();
  
  // Mock data to simulate the articles from our news API
  const articles = {
    'news-1': {
      id: 'news-1',
      title: 'Federal Reserve Signals Potential Rate Cut in Coming Months',
      source: 'Market News',
      date: 'May 2, 2025 at 04:40 AM',
      sentiment: 'Bullish',
      symbols: ['SPY', 'QQQ', 'DIA'],
      content: [
        'The Federal Reserve indicated it may start cutting interest rates soon as inflation pressures ease.',
        'Following the latest Federal Open Market Committee (FOMC) meeting, Chair Jerome Powell suggested that the central bank is preparing to pivot from its tight monetary policy stance as economic data shows inflation trending closer to the 2% target.',
        '"We\'re seeing consistent progress on disinflation, and if these trends continue, we may be in a position to adjust our policy stance," Powell stated during the press conference.',
        'Market analysts view this development as a potential catalyst for equity markets, with rate-sensitive sectors like technology and real estate expected to benefit most from lower borrowing costs.',
        'The committee maintained its benchmark rate at the current level of 5.25%-5.50%, but updated its forward guidance to indicate that rate cuts could begin within the next two meetings, depending on incoming economic data.',
        'Treasury yields fell immediately following the announcement, with the 10-year note dropping below 4.2%, while major stock indices rallied on the news.'
      ]
    },
    'news-2': {
      id: 'news-2',
      title: 'Apple Unveils New AI Features for iPhone at Developer Conference',
      source: 'Tech Report',
      date: 'May 2, 2025 at 04:36 AM',
      sentiment: 'Bullish',
      symbols: ['AAPL', 'MSFT', 'GOOGL'],
      content: [
        'Apple announced major AI enhancements coming to iPhone in its latest software update.',
        'During its annual Worldwide Developers Conference (WWDC), Apple introduced a suite of AI-powered features that will be integrated across its iOS ecosystem, particularly focusing on the iPhone\'s capabilities.',
        'The new features include enhanced Siri functionality with more natural language processing, real-time translation without internet connection, intelligent photo editing tools, and predictive text that adapts to user\'s writing style.',
        'Apple emphasized that all AI processing will happen on-device, highlighting its commitment to privacy as a key differentiator from competitors.',
        'Technology analysts noted that Apple\'s approach to AI balances utility with privacy concerns, potentially setting a new standard for responsible AI implementation in consumer devices.',
        'The features will be available in the upcoming iOS update scheduled for release this fall, compatible with iPhone models from the past three years.'
      ]
    },
    'news-3': {
      id: 'news-3',
      title: 'Oil Prices Drop as Global Demand Forecasts Weaken',
      source: 'Energy Insider',
      date: 'May 2, 2025 at 03:15 AM',
      sentiment: 'Bearish',
      symbols: ['USO', 'XOM', 'CVX'],
      content: [
        'Crude oil prices fell sharply as economic data suggested weaker demand outlook.',
        'Brent crude futures dropped below $75 per barrel, reaching a three-month low following reports from major economic forecasters reducing their global demand growth projections.',
        'The International Energy Agency (IEA) revised its 2025 oil demand growth forecast downward by 300,000 barrels per day, citing persistent economic headwinds in major consuming regions and accelerating transition to renewable energy sources.',
        'Additional pressure came from unexpectedly high U.S. crude inventory data, which showed a build of 4.2 million barrels against analyst expectations of a 1.5 million barrel draw.',
        'OPEC+ members will meet next week to discuss production policy, with market analysts now anticipating potential cuts to support prices in the face of deteriorating demand conditions.',
        'Energy stocks underperformed broader market indices, with major oil companies seeing share price declines of 2-4% following the news.'
      ]
    }
  };
  
  const article = articles[newsId];
  
  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // If article not found
  if (!article) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={handleBack}
          variant="outlined"
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            Article not found
          </Typography>
          <Typography variant="body1">
            The article you're looking for is not available or may have been removed.
          </Typography>
        </Paper>
      </Container>
    );
  }

  const isBullish = article.sentiment === 'Bullish';
  const TrendIcon = isBullish ? TrendingUpIcon : TrendingDownIcon;

  return (
    <Container maxWidth="lg" sx={{ pt: 3, pb: 6 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <MuiLink component={Link} to="/" underline="hover" color="inherit">
          Home
        </MuiLink>
        <MuiLink component={Link} to="/news" underline="hover" color="inherit">
          News
        </MuiLink>
        <Typography color="text.primary">Article</Typography>
      </Breadcrumbs>
      
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        {/* Back button */}
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={handleBack}
          variant="outlined"
          size="medium"
          sx={{ mb: 4 }}
        >
          Back
        </Button>
        
        {/* Article title */}
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
          {article.title}
        </Typography>
        
        {/* Source, date and sentiment indicator */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Typography variant="subtitle1" color="text.secondary">
            {article.source} • {article.date}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TrendIcon sx={{ 
              color: isBullish ? 'success.main' : 'error.main',
              mr: 0.5
            }} />
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: isBullish ? 'success.main' : 'error.main',
                fontWeight: 500 
              }}
            >
              {article.sentiment}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 4 }} />
        
        {/* Article content */}
        <Box sx={{ mb: 4 }}>
          {article.content.map((paragraph, idx) => (
            <Typography 
              key={idx} 
              variant="body1" 
              paragraph 
              sx={{ 
                lineHeight: 1.7,
                fontSize: '1.05rem' 
              }}
            >
              {paragraph}
            </Typography>
          ))}
        </Box>
        
        {/* Related symbols */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
            Related Symbols
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            {article.symbols.map(symbol => (
              <Chip
                key={symbol}
                label={symbol}
                component={Link}
                to={`/stocks/${symbol}`}
                clickable
                variant="outlined"
                sx={{ 
                  borderRadius: '16px',
                  px: 1,
                  fontSize: '0.9rem'
                }}
              />
            ))}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default NewsArticlePage; 