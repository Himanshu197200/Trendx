// Mock data for market news notifications
export const getMockNewsData = () => [
  {
    uuid: 'news-1',
    title: 'Federal Reserve Signals Potential Rate Cut in Coming Months',
    description: 'The Federal Reserve indicated it may start cutting interest rates soon as inflation pressures ease.',
    published_at: new Date().toISOString(),
    source: 'Market News',
    url: 'https://example.com/news/1',
    symbols: ['SPY', 'QQQ', 'DIA'],
    sentiment: { polarity: 0.65, neg: 0.1, neu: 0.25, pos: 0.65 }
  },
  {
    uuid: 'news-2',
    title: 'Apple Unveils New AI Features for iPhone at Developer Conference',
    description: 'Apple announced major AI enhancements coming to iPhone in its latest software update.',
    published_at: new Date(Date.now() - 3600000).toISOString(),
    source: 'Tech Report',
    url: 'https://example.com/news/2',
    symbols: ['AAPL', 'MSFT', 'GOOGL'],
    sentiment: { polarity: 0.45, neg: 0.15, neu: 0.4, pos: 0.45 }
  },
  {
    uuid: 'news-3',
    title: 'Oil Prices Drop as Global Demand Forecasts Weaken',
    description: 'Crude oil prices fell sharply as economic data suggested weaker demand outlook.',
    published_at: new Date(Date.now() - 7200000).toISOString(),
    source: 'Energy Insider',
    url: 'https://example.com/news/3',
    symbols: ['USO', 'XOM', 'CVX'],
    sentiment: { polarity: -0.55, neg: 0.55, neu: 0.35, pos: 0.1 }
  },
  {
    uuid: 'news-4',
    title: 'Reliance Industries Reports Strong Quarterly Growth',
    description: 'Indian conglomerate Reliance Industries posted better-than-expected quarterly results.',
    published_at: new Date(Date.now() - 10800000).toISOString(),
    source: 'India Business',
    url: 'https://example.com/news/4',
    symbols: ['RELIANCE.NS', 'NIFTY'],
    sentiment: { polarity: 0.7, neg: 0.05, neu: 0.25, pos: 0.7 }
  },
  {
    uuid: 'news-5',
    title: 'Tesla Recalls 200,000 Vehicles Over Software Issue',
    description: 'Electric vehicle maker Tesla announced a recall affecting several of its models.',
    published_at: new Date(Date.now() - 18000000).toISOString(),
    source: 'Auto News',
    url: 'https://example.com/news/5',
    symbols: ['TSLA'],
    sentiment: { polarity: -0.4, neg: 0.4, neu: 0.5, pos: 0.1 }
  },
  {
    uuid: 'news-6',
    title: 'Amazon Expands Same-Day Delivery Service to 15 New Cities',
    description: 'E-commerce giant Amazon is expanding its same-day delivery service to additional metropolitan areas.',
    published_at: new Date(Date.now() - 25200000).toISOString(),
    source: 'Retail Insights',
    url: 'https://example.com/news/6',
    symbols: ['AMZN'],
    sentiment: { polarity: 0.5, neg: 0.1, neu: 0.4, pos: 0.5 }
  }
];

// Format news publication date
export const formatNewsDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Get sentiment color based on score
export const getSentimentColor = (sentiment) => {
  if (!sentiment) return 'text.secondary';
  
  const score = sentiment.polarity || 0;
  if (score > 0.3) return 'success.main';
  if (score < -0.3) return 'error.main';
  return 'warning.main';
}; 