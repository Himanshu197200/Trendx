import { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  IconButton,
  Collapse,
  CardActions,
  Button
} from '@mui/material';
import { 
  ShowChart as ShowChartIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Helper function to safely format numbers
const safeToFixed = (value, digits = 2) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0.00';
  }
  return Number(value).toFixed(digits);
};

// Helper function to safely format with locale string
const safeLocaleString = (value, options = {}) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0.00';
  }
  return Number(value).toLocaleString('en-IN', options);
};

const ExpandMoreButton = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const StockCard = ({ stock }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  // Validate stock data
  if (!stock || typeof stock !== 'object') {
    return null;
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleViewChart = () => {
    navigate(`/stocks/${stock.symbol}`);
  };

  // Check if percent_change exists and is a number
  const percentChange = stock.percent_change !== undefined && 
                       stock.percent_change !== null ? 
                       Number(stock.percent_change) : 0;
  
  const isPositive = percentChange >= 0;
  const changeColor = isPositive ? 'success.main' : 'error.main';
  const TrendIcon = isPositive ? TrendingUpIcon : TrendingDownIcon;

  // Safe access to symbol
  const symbol = stock.symbol ? 
    (typeof stock.symbol === 'string' ? stock.symbol.split('.')[0] : stock.symbol) 
    : '';

  return (
    <Card 
      className="stock-card fade-in" 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible'
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '-10px', 
          right: '20px',
          backgroundColor: changeColor,
          color: 'white',
          borderRadius: '4px',
          px: 1,
          py: 0.5,
          fontSize: '0.75rem',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5
        }}
      >
        <TrendIcon fontSize="small" />
        {isPositive ? '+' : ''}{safeToFixed(percentChange)}%
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h5" component="div" sx={{ fontWeight: 600, mb: 0.5 }}>
              {symbol}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {stock.name || 'Unknown Company'}
            </Typography>
          </Box>
          <IconButton 
            aria-label="more options" 
            size="small"
            sx={{ mt: -1, mr: -1 }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
            ₹{safeLocaleString(stock.price, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              ml: 1, 
              color: changeColor,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {isPositive ? '+' : ''}{safeToFixed(stock.change)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Open</Typography>
          <Typography variant="body2" fontWeight={500}>₹{safeToFixed(stock.open)}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">High</Typography>
          <Typography variant="body2" fontWeight={500}>₹{safeToFixed(stock.high)}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">Low</Typography>
          <Typography variant="body2" fontWeight={500}>₹{safeToFixed(stock.low)}</Typography>
        </Box>
      </CardContent>

      <CardActions disableSpacing sx={{ mt: 'auto', pt: 0 }}>
        <Button 
          size="small" 
          startIcon={<ShowChartIcon />}
          color="primary"
          onClick={handleViewChart}
        >
          View Chart
        </Button>
        <ExpandMoreButton
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMoreButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Previous Close</Typography>
            <Typography variant="body2">₹{safeToFixed(stock.previous_close)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Volume</Typography>
            <Typography variant="body2">{stock.volume ? stock.volume.toLocaleString('en-IN') : '0'}</Typography>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(StockCard);