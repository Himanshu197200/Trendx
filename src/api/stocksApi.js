import axios from 'axios';
import { 
  FINNHUB_API_KEY, 
  FINNHUB_BASE_URL, 
  STOCK_SYMBOLS, 
  ALPHA_VANTAGE_API_KEY, 
  ALPHA_VANTAGE_BASE_URL,
  ACTIVE_API,
  REFRESH_INTERVAL,
  INDIAN_STOCK_SYMBOLS
} from './config';

// Create axios instance for Finnhub API
const finnhubAxios = axios.create({
  baseURL: FINNHUB_BASE_URL,
  params: {
    token: FINNHUB_API_KEY
  }
});

// Create axios instance for Alpha Vantage API
const alphaVantageAxios = axios.create({
  baseURL: ALPHA_VANTAGE_BASE_URL,
  params: {
    apikey: ALPHA_VANTAGE_API_KEY
  }
});

// Consistent number formatting helper
const formatNumberValue = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(parseFloat(value))) {
    return parseFloat(0).toFixed(decimals);
  }
  return parseFloat(parseFloat(value).toFixed(decimals));
};

// Simple cache implementation
const cache = {
  data: {},
  
  // Get cached value
  get(key, maxAge = 60000) {
    const item = this.data[key];
    if (item && (Date.now() - item.timestamp < maxAge)) {
      return item.value;
    }
    return null;
  },
  
  // Set cache value
  set(key, value) {
    this.data[key] = {
      value,
      timestamp: Date.now()
    };
  }
};

// Simple delay helper
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Cache for mock data to avoid regenerating on every call
let mockDataCache = null;
let mockDataTimestamp = 0;

const getMockStockData = () => {
  // Use cached data if less than 15 seconds old
  const now = Date.now();
  if (mockDataCache && now - mockDataTimestamp < 15000) {
    // Add small random fluctuations to prices without regenerating everything
    return mockDataCache.map(stock => ({
      ...stock,
      price: stock.price + (Math.random() * 0.5 - 0.25),
      change: (Math.random() > 0.5 ? 1 : -1) * Math.random() * 0.5,
      percent_change: (Math.random() > 0.5 ? 1 : -1) * Math.random() * 0.2,
    }));
  }

  // Base US stocks mock data (international stocks)
  const usStocks = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 173.50 + (Math.random() * 5 - 2.5),
      change: 1.25 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 0.75 * (Math.random() > 0.5 ? 1 : -1),
      high: 175.80,
      low: 172.20,
      open: 172.50,
      volume: 78459000,
      previous_close: 172.25,
      isIndian: false
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 338.20 + (Math.random() * 6 - 3),
      change: 2.10 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 0.65 * (Math.random() > 0.5 ? 1 : -1),
      high: 340.50,
      low: 336.75,
      open: 339.10,
      volume: 25678900,
      previous_close: 336.10,
      isIndian: false
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 131.40 + (Math.random() * 4 - 2),
      change: 1.85 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 0.85 * (Math.random() > 0.5 ? 1 : -1),
      high: 133.20,
      low: 130.10,
      open: 130.75,
      volume: 19876500,
      previous_close: 129.55,
      isIndian: false
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 127.80 + (Math.random() * 5 - 2.5),
      change: 1.45 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 0.95 * (Math.random() > 0.5 ? 1 : -1),
      high: 129.30,
      low: 126.40,
      open: 128.10,
      volume: 32456700,
      previous_close: 126.35,
      isIndian: false
    },
    {
      symbol: 'META',
      name: 'Meta Platforms Inc.',
      price: 299.50 + (Math.random() * 6 - 3),
      change: 2.75 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 1.05 * (Math.random() > 0.5 ? 1 : -1),
      high: 302.25,
      low: 297.80,
      open: 300.10,
      volume: 15679000,
      previous_close: 296.75,
      isIndian: false
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 238.70 + (Math.random() * 8 - 4),
      change: 3.25 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 1.45 * (Math.random() > 0.5 ? 1 : -1),
      high: 242.50,
      low: 235.90,
      open: 237.20,
      volume: 42356700,
      previous_close: 235.45,
      isIndian: false
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 410.30 + (Math.random() * 10 - 5),
      change: 4.50 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 1.25 * (Math.random() > 0.5 ? 1 : -1),
      high: 415.80,
      low: 407.20,
      open: 412.10,
      volume: 28976500,
      previous_close: 405.80,
      isIndian: false
    },
    {
      symbol: 'JPM',
      name: 'JPMorgan Chase & Co.',
      price: 143.60 + (Math.random() * 4 - 2),
      change: 1.15 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 0.80 * (Math.random() > 0.5 ? 1 : -1),
      high: 145.20,
      low: 142.30,
      open: 144.10,
      volume: 12346700,
      previous_close: 142.45,
      isIndian: false
    },
    {
      symbol: 'V',
      name: 'Visa Inc.',
      price: 242.90 + (Math.random() * 5 - 2.5),
      change: 1.35 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 0.60 * (Math.random() > 0.5 ? 1 : -1),
      high: 244.50,
      low: 241.20,
      open: 243.30,
      volume: 8976500,
      previous_close: 241.55,
      isIndian: false
    },
    {
      symbol: 'JNJ',
      name: 'Johnson & Johnson',
      price: 154.80 + (Math.random() * 4 - 2),
      change: 0.95 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 0.55 * (Math.random() > 0.5 ? 1 : -1),
      high: 156.30,
      low: 153.90,
      open: 155.10,
      volume: 7654300,
      previous_close: 153.85,
      isIndian: false
    },
    // Adding 6 more international stocks
    {
      symbol: 'NFLX',
      name: 'Netflix Inc.',
      price: 590.50 + (Math.random() * 12 - 6),
      change: 3.75 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 0.70 * (Math.random() > 0.5 ? 1 : -1),
      high: 595.30,
      low: 585.70,
      open: 588.20,
      volume: 9876500,
      previous_close: 586.75,
      isIndian: false
    },
    {
      symbol: 'DIS',
      name: 'Walt Disney Company',
      price: 111.20 + (Math.random() * 4 - 2),
      change: 1.45 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 1.30 * (Math.random() > 0.5 ? 1 : -1),
      high: 112.70,
      low: 109.80,
      open: 110.40,
      volume: 11234500,
      previous_close: 109.75,
      isIndian: false
    },
    {
      symbol: 'ADBE',
      name: 'Adobe Inc.',
      price: 481.30 + (Math.random() * 9 - 4.5),
      change: 2.85 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 0.65 * (Math.random() > 0.5 ? 1 : -1),
      high: 485.20,
      low: 477.40,
      open: 480.10,
      volume: 5678900,
      previous_close: 478.45,
      isIndian: false
    },
    {
      symbol: 'PYPL',
      name: 'PayPal Holdings Inc.',
      price: 62.40 + (Math.random() * 3 - 1.5),
      change: 0.95 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 1.50 * (Math.random() > 0.5 ? 1 : -1),
      high: 63.50,
      low: 61.30,
      open: 62.10,
      volume: 14563200,
      previous_close: 61.45,
      isIndian: false
    },
    {
      symbol: 'INTC',
      name: 'Intel Corporation',
      price: 31.20 + (Math.random() * 2 - 1),
      change: 0.65 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 2.10 * (Math.random() > 0.5 ? 1 : -1),
      high: 31.80,
      low: 30.70,
      open: 31.40,
      volume: 32145600,
      previous_close: 30.55,
      isIndian: false
    },
    {
      symbol: 'AMD',
      name: 'Advanced Micro Devices Inc.',
      price: 142.80 + (Math.random() * 6 - 3),
      change: 2.35 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 1.65 * (Math.random() > 0.5 ? 1 : -1),
      high: 145.60,
      low: 140.20,
      open: 143.40,
      volume: 28976500,
      previous_close: 140.45,
      isIndian: false
    }
  ];
  
  // Define Indian stocks that were missing
  const indianStocks = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd.',
      price: 2580.50 + (Math.random() * 20 - 10),
      change: 15.75 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 0.65 * (Math.random() > 0.5 ? 1 : -1),
      high: 2595.30,
      low: 2565.70,
      open: 2570.20,
      volume: 7896500,
      previous_close: 2564.75,
      isIndian: true
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services Ltd.',
      price: 3420.75 + (Math.random() * 25 - 12.5),
      change: -25.50 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: -0.85 * (Math.random() > 0.5 ? 1 : -1),
      high: 3435.20,
      low: 3405.40,
      open: 3410.10,
      volume: 3678900,
      previous_close: 3446.25,
      isIndian: true
    },
    {
      symbol: 'HDFCBANK',
      name: 'HDFC Bank Ltd.',
      price: 1582.30 + (Math.random() * 15 - 7.5),
      change: 12.25 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 0.70 * (Math.random() > 0.5 ? 1 : -1),
      high: 1595.20,
      low: 1575.40,
      open: 1580.10,
      volume: 4678900,
      previous_close: 1570.05,
      isIndian: true
    },
    {
      symbol: 'INFY',
      name: 'Infosys Ltd.',
      price: 1447.50 + (Math.random() * 14 - 7),
      change: -10.50 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: -0.75 * (Math.random() > 0.5 ? 1 : -1),
      high: 1455.20,
      low: 1440.40,
      open: 1445.10,
      volume: 2678900,
      previous_close: 1458.00,
      isIndian: true
    },
    {
      symbol: 'HINDUNILVR',
      name: 'Hindustan Unilever Ltd.',
      price: 2457.25 + (Math.random() * 20 - 10),
      change: 18.75 * (Math.random() > 0.5 ? 1 : -1),
      percent_change: 0.80 * (Math.random() > 0.5 ? 1 : -1),
      high: 2475.20,
      low: 2445.40,
      open: 2460.10,
      volume: 1678900,
      previous_close: 2438.50,
      isIndian: true
    },
    // Add more Indian stocks as needed
  ];
  
  // Combine all stocks
  const allStocks = [...usStocks, ...indianStocks];
  
  // Update the cache
  mockDataCache = allStocks;
  mockDataTimestamp = now;
  
  return allStocks;
};

// Force refresh the cache to include the new stocks
export const clearStockCache = () => {
  mockDataCache = null;
  mockDataTimestamp = 0;
  cache.data = {};
};

// Optimize the getStockQuotes function to prevent slow rendering
export const getStockQuotes = async () => {
  try {
    // First clear the cache to ensure we get fresh data with all stocks
    clearStockCache();
    
    // Increase cache time to 30 seconds
    const cachedData = cache.get('allQuotes', 30000);
    if (cachedData) {
      return cachedData;
    }
    
    // Use a batch approach to fetch data faster
    if (ACTIVE_API === 'alphavantage') {
      // Return mock data while loading real data in background
      const mockData = getMockStockData();
      cache.set('allQuotes', mockData);
      
      // Start loading real data in background
      setTimeout(() => {
        getAlphaVantageQuotes().then(realData => {
          if (realData && realData.length > 0) {
            cache.set('allQuotes', realData);
          }
        });
      }, 100);
      
      return mockData;
    } else {
      return getMockStockData();
    }
  } catch (error) {
    console.error('Error fetching stock quotes:', error);
    return getMockStockData();
  }
};

// Optimize Alpha Vantage fetching
const getAlphaVantageQuotes = async () => {
  try {
    // Process data in smaller batches to avoid overwhelming the API
    const results = [];
    const batchSize = 5;
    
    // Process symbols in batches
    for (let i = 0; i < STOCK_SYMBOLS.length; i += batchSize) {
      const batch = STOCK_SYMBOLS.slice(i, i + batchSize);
      const batchPromises = batch.map(async (symbol) => {
      try {
        const response = await alphaVantageAxios.get('', {
          params: {
            function: 'GLOBAL_QUOTE',
            symbol
          }
        });
        
          const quote = response.data['Global Quote'];
          if (quote && quote['01. symbol']) {
            const isIndian = INDIAN_STOCK_SYMBOLS.includes(symbol);
            const formattedSymbol = symbol.replace('.NSE', '');
            
            return {
              symbol: formattedSymbol,
              name: formattedSymbol, // Simplified name handling
              price: formatNumberValue(quote['05. price']),
              change: formatNumberValue(quote['09. change']),
              percent_change: formatNumberValue(quote['10. change percent'].replace('%', '')),
              high: formatNumberValue(quote['03. high']),
              low: formatNumberValue(quote['04. low']),
              open: formatNumberValue(quote['02. open']),
              volume: parseInt(quote['06. volume'] || '0'),
              previous_close: formatNumberValue(quote['08. previous close']),
              isIndian
            };
          }
      } catch (error) {
          console.error(`Error fetching data for ${symbol}:`, error);
          return null;
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults.filter(Boolean));
      
      // Add a small delay between batches to respect API limits
      await delay(250);
    }
    
    return results;
  } catch (error) {
    console.error('Error fetching Alpha Vantage stock quotes:', error);
    return getMockStockData();
  }
};

// Function to get time series data for a specific stock
export const getStockTimeSeries = async (symbol, resolution = 'D', from = null, to = null) => {
  try {
    if (ACTIVE_API === 'alphavantage') {
      return getAlphaVantageTimeSeries(symbol);
    } else {
      return getFinnhubTimeSeries(symbol, resolution, from, to);
    }
  } catch (error) {
    console.error('Error fetching time series data:', error);
    return getMockTimeSeriesData(symbol);
  }
};

// Function to get time series data from Finnhub
const getFinnhubTimeSeries = async (symbol, resolution = 'D', from = null, to = null) => {
  try {
    // Check API key
    if (!FINNHUB_API_KEY || FINNHUB_API_KEY === 'YOUR_FINNHUB_API_KEY') {
      return getMockTimeSeriesData(symbol);
    }

    // Set default time range
    if (!to) to = Math.floor(Date.now() / 1000);
    if (!from) from = Math.floor(to - (30 * 24 * 60 * 60)); // 30 days ago

    // Check cache
    const cacheKey = `timeseries-finnhub-${symbol}-${resolution}-${from}-${to}`;
    const cachedData = cache.get(cacheKey, 5 * 60000); // Cache for 5 minutes
    if (cachedData) {
      return cachedData;
    }

    const response = await finnhubAxios.get('/stock/candle', {
      params: { symbol, resolution, from, to }
    });

    // Format the data
    const formattedData = {
      meta: {
        symbol,
        interval: resolution === 'D' ? '1day' : resolution,
        currency: 'USD',
        exchange: 'US',
        type: 'Common Stock'
      },
      values: Array.isArray(response.data.t) ? response.data.t.map((timestamp, index) => {
        const date = new Date(timestamp * 1000);
        return {
          datetime: date.toISOString().split('T')[0],
          open: response.data.o[index],
          high: response.data.h[index],
          low: response.data.l[index],
          close: response.data.c[index],
          volume: response.data.v[index]
        };
      }) : []
    };
    
    // Cache the result
    cache.set(cacheKey, formattedData);

    return formattedData;
  } catch (error) {
    console.error('Error fetching Finnhub time series data:', error);
    return getMockTimeSeriesData(symbol);
  }
};

// Function to get time series data from Alpha Vantage
const getAlphaVantageTimeSeries = async (symbol) => {
  try {
    // Check cache
    const cacheKey = `timeseries-alphavantage-${symbol}`;
    const cachedData = cache.get(cacheKey, 5 * 60000); // Cache for 5 minutes
    if (cachedData) {
      return cachedData;
    }

    // Get daily time series for last 30 days
    const response = await alphaVantageAxios.get('', {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol,
        outputsize: 'compact'
      }
    });

    if (!response.data || !response.data['Time Series (Daily)']) {
      throw new Error('Invalid Alpha Vantage time series response');
    }

    const timeSeriesData = response.data['Time Series (Daily)'];
    const dates = Object.keys(timeSeriesData).sort().reverse();
    
    // Limit to last 30 days
    const last30Days = dates.slice(0, 30);
    
    const values = last30Days.map(date => {
      const dailyData = timeSeriesData[date];
      return {
        datetime: date,
        open: parseFloat(dailyData['1. open']),
        high: parseFloat(dailyData['2. high']),
        low: parseFloat(dailyData['3. low']),
        close: parseFloat(dailyData['4. close']),
        volume: parseInt(dailyData['5. volume'])
      };
    });

    const formattedData = {
      meta: {
        symbol,
        interval: '1day',
        currency: 'USD',
        exchange: 'US',
        type: 'Common Stock'
      },
      values
    };
    
    // Cache the result
    cache.set(cacheKey, formattedData);

    return formattedData;
  } catch (error) {
    console.error('Error fetching Alpha Vantage time series data:', error);
    return getMockTimeSeriesData(symbol);
  }
};

// Function to search for stocks - simplified
export const searchStocks = async (query) => {
  try {
    if (ACTIVE_API === 'alphavantage') {
      return searchAlphaVantageStocks(query);
    } else {
      return searchFinnhubStocks(query);
    }
  } catch (error) {
    console.error('Error searching for stocks:', error);
    return [];
  }
};

// Function to search for stocks using Finnhub
const searchFinnhubStocks = async (query) => {
  try {
    // Use mock data if no API key
    if (!FINNHUB_API_KEY || FINNHUB_API_KEY === 'YOUR_FINNHUB_API_KEY') {
      return getMockStockData().filter(stock => 
        stock.symbol.toLowerCase().includes(query.toLowerCase()) || 
        stock.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Try to use the API first
    try {
      const response = await finnhubAxios.get('/search', { 
        params: { q: query } 
      });
      
      if (response.data.result && response.data.result.length > 0) {
        // Just return the first 3 results without getting full details
        return response.data.result.slice(0, 3).map(item => ({
          symbol: item.symbol,
          name: item.description,
          price: 0,
          change: 0,
          percent_change: 0,
          high: 0,
          low: 0,
          open: 0,
          volume: 0,
          previous_close: 0
        }));
      }
    } catch (error) {
      console.warn('Finnhub search API call failed, using mock data', error);
    }
    
    // Fallback to filtered mock data
    return getMockStockData().filter(stock => 
      stock.symbol.toLowerCase().includes(query.toLowerCase()) || 
      stock.name.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching for stocks with Finnhub:', error);
    return [];
  }
};

// Function to search for stocks using Alpha Vantage
const searchAlphaVantageStocks = async (query) => {
  try {
    // Cache key for search results
    const cacheKey = `search-alphavantage-${query}`;
    const cachedResults = cache.get(cacheKey, 3600000); // Cache for 1 hour
    if (cachedResults) {
      return cachedResults;
    }
    
    // Search for symbols
    const response = await alphaVantageAxios.get('', {
      params: {
        function: 'SYMBOL_SEARCH',
        keywords: query
      }
    });
    
    if (response.data && response.data.bestMatches && response.data.bestMatches.length > 0) {
      // Return up to 5 results
      const results = response.data.bestMatches.slice(0, 5).map(item => ({
        symbol: item['1. symbol'],
        name: item['2. name'],
        price: 0, // These will need to be fetched separately
        change: 0,
        percent_change: 0,
        high: 0,
        low: 0,
        open: 0,
        volume: 0,
        previous_close: 0
      }));
      
      // Cache the results
      cache.set(cacheKey, results);
      
      return results;
    }
  } catch (error) {
    console.warn('Alpha Vantage search API call failed, using mock data', error);
  }
  
  // Fallback to filtered mock data
  return getMockStockData().filter(stock => 
    stock.symbol.toLowerCase().includes(query.toLowerCase()) || 
    stock.name.toLowerCase().includes(query.toLowerCase())
  );
};

// Simplified mock time series data generator
const getMockTimeSeriesData = (symbol) => {
  const today = new Date();
  const data = [];
  
  // Simplified to generate 15 days of data instead of 30
  for (let i = 14; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Find a base price for the stock
    const stockData = getMockStockData().find(s => s.symbol === symbol);
    const basePrice = stockData ? stockData.price : 100;
    
    // Simple random variation
    const variation = basePrice * 0.02 * (Math.random() - 0.5);
    
    data.push({
      datetime: date.toISOString().split('T')[0],
      open: basePrice - variation/2,
      high: basePrice + variation,
      low: basePrice - variation,
      close: basePrice + variation/2,
      volume: Math.floor(Math.random() * 5000000)
    });
  }
  
  return {
    meta: {
      symbol,
      interval: '1day',
      currency: 'USD',
      exchange: 'US',
      type: 'Common Stock'
    },
    values: data
  };
};

// Add a real API function
export const fetchRealTimeStockData = async (symbol) => {
  try {
    // Alpha Vantage free API 
    const apiKey = 'demo'; // Replace with your API key
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    // Format the data for our chart
    if (data['Time Series (Daily)']) {
      const timeSeriesData = data['Time Series (Daily)'];
      const formattedData = Object.entries(timeSeriesData).map(([date, values]) => ({
        date: date,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseInt(values['5. volume'])
      })).reverse();
      
      return formattedData;
    }
    
    throw new Error('Invalid data format received from API');
  } catch (error) {
    console.error('Error fetching stock data:', error);
    // Fall back to mock data if API fails
    return null;
  }
};