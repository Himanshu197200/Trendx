import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Typography,
  Box,
  Chip,
  Button,
  IconButton,
  Link,
  Divider
} from '@mui/material';
import { 
  Close as CloseIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  OpenInNew as OpenInNewIcon
} from '@mui/icons-material';

const NewsDetailModal = ({ open, onClose, newsItem }) => {
  const navigate = useNavigate();
  
  if (!newsItem) return null;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const getSentimentIcon = (sentiment) => {
    if (!sentiment || !sentiment.polarity) return null;
    
    const score = sentiment.polarity;
    if (score > 0.3) return <TrendingUpIcon sx={{ fontSize: 20, color: 'success.main', mr: 0.5 }} />;
    if (score < -0.3) return <TrendingDownIcon sx={{ fontSize: 20, color: 'error.main', mr: 0.5 }} />;
    return null;
  };
  
  const getSentimentText = (sentiment) => {
    if (!sentiment || !sentiment.polarity) return '';
    
    const score = sentiment.polarity;
    if (score > 0.3) return 'Bullish';
    if (score < -0.3) return 'Bearish';
    return 'Neutral';
  };
  
  const getSentimentColor = (sentiment) => {
    if (!sentiment || !sentiment.polarity) return 'text.secondary';
    
    const score = sentiment.polarity;
    if (score > 0.3) return 'success.main';
    if (score < -0.3) return 'error.main';
    return 'warning.main';
  };

  const handleReadFullArticle = () => {
    onClose(); // Close the modal
    navigate(`/news/${newsItem.uuid}`); // Navigate to our internal news article page
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      aria-labelledby="news-detail-title"
    >
      <DialogTitle id="news-detail-title" sx={{ pr: 6 }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'grey.500',
          }}
        >
          <CloseIcon />
        </IconButton>
        
        <Typography variant="h5" component="div" sx={{ fontWeight: 600, mb: 1 }}>
          {newsItem.title}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle2" color="text.secondary">
            {newsItem.source} • {formatDate(newsItem.published_at)}
          </Typography>
          
          {newsItem.sentiment && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {getSentimentIcon(newsItem.sentiment)}
              <Typography
                variant="subtitle2"
                sx={{ color: getSentimentColor(newsItem.sentiment), fontWeight: 'bold' }}
              >
                {getSentimentText(newsItem.sentiment)}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent>
        {newsItem.description ? (
          <Typography variant="body1" paragraph>
            {newsItem.description}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary" paragraph>
            No detailed description available for this news item.
          </Typography>
        )}
        
        {newsItem.symbols && newsItem.symbols.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Related Symbols:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {newsItem.symbols.map((symbol, index) => (
                <Chip 
                  key={index}
                  label={symbol}
                  variant="outlined"
                  size="small"
                  clickable
                />
              ))}
            </Box>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button 
          startIcon={<OpenInNewIcon />}
          variant="outlined"
          onClick={handleReadFullArticle}
        >
          Read Full Article
        </Button>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewsDetailModal; 