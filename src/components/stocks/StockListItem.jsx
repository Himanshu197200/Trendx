import { 
  Box, 
  Typography, 
  IconButton 
} from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  ShowChart as ShowChartIcon,
  MoreHoriz as MoreHorizIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function StockListItem({ stock }) {
  const navigate = useNavigate();
  const isPositive = stock.percent_change >= 0;
  const changeColor = isPositive ? 'success.main' : 'error.main';
  const TrendIcon = isPositive ? TrendingUpIcon : TrendingDownIcon;

  const handleViewChart = () => {
    navigate(`/stocks/${stock.symbol}`);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        py: 2,
        px: 3,
        transition: 'background-color 0.2s ease',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.02)'
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
        <Box>
          <Typography variant="body1" fontWeight={600}>
            {stock.symbol.split('.')[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {stock.name}
          </Typography>
        </Box>
      </Box>
      
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end',
          width: '25%'
        }}
      >
        <Typography variant="body1" fontWeight={600}>
          ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Typography>
      </Box>
      
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end',
          width: '20%'
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            color: changeColor,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <TrendIcon fontSize="small" />
          {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.percent_change.toFixed(2)}%)
        </Typography>
      </Box>
      
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end',
          gap: 1,
          width: '15%'
        }}
      >
        <IconButton size="small" color="primary" onClick={handleViewChart}>
          <ShowChartIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <MoreHorizIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default StockListItem;