# TrendX Dashboard

A React-based dashboard for tracking US stock market trends with real-time data from Finnhub API.

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your Finnhub API key:
   - Sign up at [Finnhub.io](https://finnhub.io/register)
   - After registration, get your API key from your dashboard
   - Create a `.env` file in the project root with the following content:
     ```
     VITE_FINNHUB_API_KEY=your_actual_api_key_here
     ```

4. Start the development server:
   ```
   npm run dev
   ```

## Features

- Live stock quotes
- Historical time series data
- Stock search functionality
- Responsive grid and list views
- Mock data fallback when API key is not provided

## Environment Variables

This project uses environment variables to manage sensitive information like API keys. The following variables are used:

- `VITE_FINNHUB_API_KEY`: Your Finnhub API key

For development, these can be stored in a `.env` file. Make sure never to commit this file to source control.

## API Usage Notes

- The free Finnhub API has rate limits (60 API calls/minute)
- This application uses multiple endpoints:
  - `/quote` - For real-time stock prices
  - `/stock/profile2` - For company information
  - `/stock/candle` - For historical data
  - `/search` - For finding stocks by symbol or name

## Customization

You can modify the list of tracked stock symbols in `src/api/config.js` by updating the `STOCK_SYMBOLS` array.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
