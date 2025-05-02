// Stock Market API Configuration
// You can use either Finnhub or Alpha Vantage for stock data

// Finnhub API Configuration
export const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY || 'YOUR_FINNHUB_API_KEY';
export const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

// Alpha Vantage API Configuration
export const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 'RCVP7OD73Z79TXJ7';
export const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

// Using Alpha Vantage for real market data
export const ACTIVE_API = 'alphavantage';

// Refresh interval (30 seconds to respect API limits)
export const REFRESH_INTERVAL = 30000;

// International stock symbols (US Market)
export const INTERNATIONAL_STOCKS = [
  'AAPL',  // Apple
  'MSFT',  // Microsoft
  'GOOGL', // Alphabet (Google)
  'AMZN',  // Amazon
  'META',  // Meta (Facebook)
  'TSLA',  // Tesla
  'NVDA',  // NVIDIA
  'JPM',   // JPMorgan Chase
  'V',     // Visa
  'JNJ',   // Johnson & Johnson
  // Adding 6 more international stocks
  'NFLX',  // Netflix
  'DIS',   // Walt Disney
  'ADBE',  // Adobe
  'PYPL',  // PayPal
  'INTC',  // Intel
  'AMD'    // Advanced Micro Devices
];

// Indian stock symbols (with NSE extension for Alpha Vantage)
export const INDIAN_STOCKS = [
  'RELIANCE.NSE',   // Reliance Industries
  'TCS.NSE',        // Tata Consultancy Services
  'HDFCBANK.NSE',   // HDFC Bank
  'INFY.NSE',       // Infosys
  'HINDUNILVR.NSE', // Hindustan Unilever
  'ICICIBANK.NSE',  // ICICI Bank
  'SBIN.NSE',       // State Bank of India
  'BHARTIARTL.NSE', // Bharti Airtel
  'ITC.NSE',        // ITC Limited
  'KOTAKBANK.NSE',  // Kotak Mahindra Bank
  'WIPRO.NSE',      // Wipro
  'AXISBANK.NSE',   // Axis Bank
  'HCLTECH.NSE',    // HCL Technologies
  'ASIANPAINT.NSE', // Asian Paints
  'MARUTI.NSE',     // Maruti Suzuki
  'TATAMOTORS.NSE', // Tata Motors
  'SUNPHARMA.NSE',  // Sun Pharmaceutical
  'BAJFINANCE.NSE', // Bajaj Finance
  'TATASTEEL.NSE',  // Tata Steel
  'LT.NSE',         // Larsen & Toubro
  'INDUSINDBK.NSE', // IndusInd Bank
  'ONGC.NSE',       // Oil and Natural Gas Corporation
  'ADANIPORTS.NSE', // Adani Ports
  'ULTRACEMCO.NSE', // UltraTech Cement
  'NTPC.NSE'        // NTPC Limited
];

// Combined list of all stock symbols to track
export const STOCK_SYMBOLS = [...INTERNATIONAL_STOCKS, ...INDIAN_STOCKS];

// List identifying which stocks are Indian
export const INDIAN_STOCK_SYMBOLS = [
  'RELIANCE',
  'TCS',
  'HDFCBANK',
  'INFY',
  'HINDUNILVR',
  'ICICIBANK',
  'SBIN',
  'BHARTIARTL',
  'ITC',
  'TATAMOTORS'
]; 