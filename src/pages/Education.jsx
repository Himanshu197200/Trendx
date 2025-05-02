import React, { useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Divider,
  Breadcrumbs,
  Link,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  useTheme,
  alpha,
  Fade,
  Zoom
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon, 
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  BarChart as BarChartIcon,
  Calculate as CalculateIcon,
  Lightbulb as LightbulbIcon,
  ShowChart as ShowChartIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled, keyframes } from '@mui/system';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled components
const AnimatedBox = styled(Box)`
  animation: ${fadeIn} 0.6s ease-out;
`;

const PulseBox = styled(Box)`
  animation: ${pulse} 2s infinite ease-in-out;
`;

const ShimmerCard = styled(Card)`
  background: linear-gradient(90deg, 
    ${props => alpha(props.theme.palette.primary.main, 0.1)} 25%, 
    ${props => alpha(props.theme.palette.primary.main, 0.2)} 50%, 
    ${props => alpha(props.theme.palette.primary.main, 0.1)} 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 3s infinite linear;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid ${props => alpha(props.theme.palette.primary.main, 0.3)};
`;

const FloatIcon = styled(Box)`
  animation: ${float} 3s infinite ease-in-out;
`;

const SpinIcon = styled(Box)`
  animation: ${rotate} 15s infinite linear;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const GlowingBorder = styled(Paper)`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
      ${props => props.theme.palette.primary.main}, 
      ${props => props.theme.palette.secondary.main}, 
      ${props => props.theme.palette.primary.light});
    z-index: -1;
    border-radius: 17px;
    animation: ${shimmer} 3s infinite linear;
    background-size: 200% 200%;
  }
`;

const StyledAccordion = styled(Accordion)`
  margin-bottom: 16px;
  border-radius: 12px !important;
  overflow: hidden;
  box-shadow: ${props => props.expanded ? 
    `0 10px 20px ${alpha(props.theme.palette.primary.main, 0.15)}` : 
    '0 2px 8px rgba(0,0,0,0.05)'};
  transition: all 0.3s ease;
  
  &:before {
    display: none;
  }
  
  &:hover {
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  }
  
  .MuiAccordionSummary-root {
    padding: 16px 24px;
    background-color: ${props => props.expanded ? 
      alpha(props.theme.palette.primary.main, 0.05) : 
      'transparent'};
    transition: all 0.3s ease;
    
    &:hover {
      background-color: ${props => alpha(props.theme.palette.primary.main, 0.05)};
    }
  }
  
  .MuiAccordionDetails-root {
    padding: 24px;
    background-color: ${props => alpha(props.theme.palette.background.paper, 0.7)};
  }
`;

const HeroSection = styled(Box)`
  background: linear-gradient(135deg, 
    ${props => props.theme.palette.primary.dark}, 
    ${props => props.theme.palette.primary.main}, 
    ${props => alpha(props.theme.palette.primary.light, 0.8)});
  border-radius: 24px;
  padding: 48px;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E"),
    linear-gradient(135deg, 
      ${props => props.theme.palette.primary.dark}, 
      ${props => props.theme.palette.primary.main}, 
      ${props => alpha(props.theme.palette.primary.light, 0.8)});
    opacity: 0.7;
  }
`;

const CircleDecoration = styled(Box)`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
`;

const TabItem = styled(Tab)`
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 3px;
    background-color: ${props => props.theme.palette.primary.main};
    transition: width 0.3s ease;
    border-radius: 3px 3px 0 0;
  }
  
  &.Mui-selected::after {
    width: 30px;
  }
  
  &:hover::after {
    width: 15px;
  }
  
  &.Mui-selected {
    font-weight: 700;
  }
`;

function Education() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = React.useState(0);
  const [expandedPanel, setExpandedPanel] = React.useState(0);
  const theme = useTheme();

  // Handle scrolling to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setExpandedPanel(0); // Reset expanded panel when changing tabs
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : -1);
  };

  // Content for each tab
  const tabContent = [
    // Basics tab
    {
      title: "Stock Market Basics",
      icon: <SchoolIcon />,
      items: [
        {
          title: "What is a Stock?",
          content: "A stock (also known as equity) represents a share in the ownership of a company. When you buy a company's stock, you're purchasing a small piece of that company, called a share. As a shareholder, you have a claim to part of the company's assets and earnings. Stocks are bought and sold predominantly on stock exchanges and are the foundation of many individual investors' portfolios. The stock market brings together buyers and sellers of stocks, which represent ownership claims on businesses. It serves as both a marketplace where investors can buy and sell these ownership stakes, and as a barometer for the overall economy."
        },
        {
          title: "How Stock Markets Work",
          content: "Stock markets provide a secure and regulated environment where market participants can trade shares and other eligible financial instruments with confidence, with zero to low operational risk. Operating under defined rules as stated by the regulator, the stock markets act as primary markets and secondary markets. As a primary market, the stock market allows companies to issue and sell their shares to the public for the first time through an Initial Public Offering (IPO). This activity helps companies raise capital for expansion and growth. As a secondary market, it enables investors to buy and sell shares among themselves. The stock exchange earns a fee for every trade that occurs on its platform."
        },
        {
          title: "Types of Stocks",
          content: "Common Stock: This is the most basic type of stock an investor can purchase. Holders of common stock exercise control by electing a board of directors and voting on corporate policy. Common stockholders are on the bottom of the priority ladder for ownership structure. In the event of liquidation, common shareholders have rights to a company's assets only after bondholders, preferred shareholders, and other debtholders have been paid in full.\n\nPreferred Stock: Preferred stock represents some degree of ownership in a company but usually doesn't come with voting rights. Preferred shareholders have a higher claim on the company's assets and earnings than common stockholders. They receive dividends before common shareholders and have priority if the company goes bankrupt and is liquidated."
        },
        {
          title: "Bull vs. Bear Markets",
          content: "Bull Market: A bull market is a market condition in which prices are rising or are expected to rise. The term 'bull market' is most often used to refer to the stock market but can be applied to anything that is traded, such as bonds, real estate, currencies, and commodities. Bull markets are characterized by optimism, investor confidence, and expectations that strong results should continue for an extended period of time.\n\nBear Market: A bear market is when a market experiences prolonged price declines. It typically describes a condition in which securities prices fall 20% or more from recent highs amid widespread pessimism and negative investor sentiment. Bear markets are associated with declines in an overall market or index like the S&P 500, but individual securities or commodities can also be considered to be in a bear market if they experience a decline of 20% or more over a sustained period - typically two months or more."
        }
      ]
    },
    
    // Analysis tab
    {
      title: "Stock Analysis Methods",
      icon: <BarChartIcon />,
      items: [
        {
          title: "Fundamental Analysis",
          content: "Fundamental analysis is a method of evaluating a security in an attempt to measure its intrinsic value, by examining related economic, financial, and other qualitative and quantitative factors. Fundamental analysts study everything from the overall economy and industry conditions to the financial condition and management of companies. The end goal is to arrive at a number that an investor can compare with a security's current price in order to see whether the security is undervalued or overvalued. This method of stock analysis is considered to be the opposite of technical analysis."
        },
        {
          title: "Technical Analysis",
          content: "Technical analysis is a trading discipline that evaluates investments and identifies trading opportunities by analyzing statistical trends gathered from trading activity, such as price movement and volume. Unlike fundamental analysis, which attempts to evaluate a security's value based on business results such as sales and earnings, technical analysis focuses on the study of price and volume. Technical analysis tools are used to scrutinize the ways supply and demand for a security will affect changes in price, volume, and implied volatility. Technical analysis is often used to generate short-term trading signals from various charting tools, but can also help improve the evaluation of a security's strength or weakness relative to the broader market or one of its sectors."
        },
        {
          title: "Reading Stock Charts",
          content: "Stock charts display the price and trading volume data of a stock over a specific timeframe. Key components include:\n\n1. Price Data: Usually shown as a line, bar, or candlestick representing the stock's price movements.\n\n2. Time Scale: The horizontal axis showing the time period (day, week, month, year).\n\n3. Price Scale: The vertical axis showing the stock's price range.\n\n4. Volume: Often displayed as vertical bars at the bottom of the chart, representing how many shares were traded in each period.\n\n5. Moving Averages: Lines that show the average price over specific periods (e.g., 50-day or 200-day moving averages), helping identify trends.\n\n6. Support and Resistance Levels: Price points where stocks historically have difficulty falling below (support) or rising above (resistance)."
        },
        {
          title: "Candlestick Patterns",
          content: "Candlestick patterns are graphical representations of price movements used in technical analysis. Each candlestick typically shows four price points: open, close, high, and low. The body of the candlestick represents the opening and closing prices, while the wicks (or shadows) represent the high and low prices reached during the period. Common patterns include:\n\n1. Doji: Forms when the opening and closing prices are virtually the same, indicating indecision in the market.\n\n2. Hammer: Has a small body with a long lower wick, suggesting a potential bullish reversal after a downtrend.\n\n3. Engulfing Pattern: Occurs when a larger candlestick completely 'engulfs' the body of the previous candlestick, potentially signaling a trend reversal.\n\n4. Morning Star: A three-candlestick pattern suggesting a potential bullish reversal after a downtrend."
        },
        {
          title: "Trend Analysis",
          content: "Trend analysis is a technique used in technical analysis that attempts to predict future stock price movements based on recently observed trend data. It involves identifying patterns in price movements and using them to make predictions. The three main types of trends are:\n\n1. Uptrend: Characterized by higher highs and higher lows, indicating bullish sentiment.\n\n2. Downtrend: Characterized by lower highs and lower lows, indicating bearish sentiment.\n\n3. Sideways/Horizontal Trend: Occurs when prices move within a relatively narrow range, indicating market indecision.\n\nTrend lines are drawn to visualize these patterns by connecting a series of highs or lows. Traders use trend analysis to determine entry and exit points for trades, as well as to set stop-loss orders and profit targets."
        }
      ]
    },
    
    // Financial Ratios tab
    {
      title: "Financial Ratios & Metrics",
      icon: <CalculateIcon />,
      items: [
        {
          title: "Price-to-Earnings (P/E) Ratio",
          content: "The Price-to-Earnings (P/E) ratio is one of the most widely used valuation metrics for stocks. It is calculated by dividing a company's current share price by its earnings per share (EPS). The P/E ratio essentially shows how much investors are willing to pay for each dollar of earnings. A high P/E ratio could suggest that a stock's price is high relative to earnings and possibly overvalued. Conversely, a low P/E ratio might indicate that the current stock price is low relative to earnings and potentially undervalued. However, P/E ratios should be compared between companies in the same industry, as different industries have different growth rates and business models that justify different P/E levels. The P/E ratio is most useful when considering a company's historical P/E values, the P/E values of similar companies, and the market's overall P/E value."
        },
        {
          title: "Price-to-Book (P/B) Ratio",
          content: "The Price-to-Book (P/B) ratio compares a company's market value to its book value. It is calculated by dividing the current closing price of the stock by the latest quarter's book value per share. Book value is the value of all assets minus all liabilities, essentially representing the net asset value of a company. The P/B ratio is used to compare a stock's market value to its book value. It is a preferred method for valuing financial companies like banks, as these companies typically have large amounts of assets on their balance sheets. A lower P/B ratio could mean that the stock is undervalued, but it could also mean that something is fundamentally wrong with the company. Similarly, a high P/B ratio might indicate that the stock is overvalued or that the company is expected to generate high returns on its assets."
        },
        {
          title: "Earnings Per Share (EPS)",
          content: "Earnings Per Share (EPS) is a company's profit divided by the outstanding shares of its common stock. It indicates how much money a company makes for each share of stock. The higher a company's EPS, the more profitable it is considered to be. EPS is calculated as: EPS = (Net Income - Preferred Dividends) ÷ Average Outstanding Common Shares. There are several variations of EPS used for different purposes:\n\n1. Basic EPS: Uses the weighted average of common shares outstanding during the period.\n\n2. Diluted EPS: Includes all convertible securities (like options and warrants) that could potentially become common stock, making it a more conservative metric.\n\n3. Trailing EPS: Based on performance over the previous 12 months.\n\n4. Forward EPS: Based on projections for a future period (usually the next fiscal year)."
        },
        {
          title: "Return on Equity (ROE)",
          content: "Return on Equity (ROE) is a measure of financial performance calculated by dividing net income by shareholders' equity. It is expressed as a percentage and measures a corporation's profitability by revealing how much profit a company generates with the money shareholders have invested. ROE is calculated as: ROE = Net Income ÷ Shareholders' Equity. A higher ROE generally indicates a more efficient use of equity capital, although extremely high ROE values might be unsustainable. When analyzing ROE, it's important to compare it with the company's historical values and with those of similar companies in the same industry. ROE can be artificially inflated by high debt levels (as debt decreases shareholders' equity) or by share buybacks (which also reduce shareholders' equity)."
        },
        {
          title: "Debt-to-Equity Ratio",
          content: "The Debt-to-Equity (D/E) ratio is a financial leverage ratio that compares a company's total debt to its shareholder equity. It is calculated by dividing total liabilities by shareholders' equity, with both figures found on a company's balance sheet. The D/E ratio indicates the proportion of debt and equity a company is using to finance its assets and operations. A high D/E ratio generally means that a company has been aggressive in financing its growth with debt, which can lead to volatile earnings due to additional interest expense. If a lot of debt is used to finance growth, a company could potentially generate more earnings than it would have without the debt. However, if the cost of this debt financing outweighs the increased income generated, share prices may decline. Industries with capital-intensive operations, like utilities and manufacturing, typically have higher D/E ratios than those with lighter capital requirements, such as technology."
        },
        {
          title: "Price/Earnings to Growth (PEG) Ratio",
          content: "The Price/Earnings to Growth (PEG) ratio is a stock's Price-to-Earnings (P/E) ratio divided by the growth rate of its earnings for a specified time period. The PEG ratio is used to determine a stock's value while also factoring in the company's expected earnings growth, and is considered to provide a more complete picture than the P/E ratio alone. It is calculated as: PEG = (P/E Ratio) ÷ Annual EPS Growth Rate. A PEG ratio of 1 is considered fair value, indicating that the stock's price is aligned with its expected growth. A PEG ratio below 1 might indicate that a stock is undervalued relative to its expected growth, while a PEG ratio above 1 might suggest that a stock is overvalued. The PEG ratio is most useful for comparing growth companies within the same industry. However, it is important to note that the accuracy of the PEG ratio depends heavily on the accuracy of growth estimates."
        },
        {
          title: "Dividend Yield",
          content: "Dividend yield is a financial ratio that shows how much a company pays out in dividends each year relative to its stock price. It is expressed as a percentage and calculated as: Dividend Yield = Annual Dividends Per Share ÷ Stock Price. The dividend yield is a way to measure how much cash flow you're getting for each dollar invested in a stock position. Investors who require a minimum stream of cash flow from their investments can use the dividend yield to determine which stocks will provide the required level of return. A high dividend yield can be an indicator of an undervalued stock if the market believes the dividend might be cut in the future. Conversely, a low dividend yield might indicate an overvalued stock or a company that reinvests most of its earnings for future growth instead of paying them out as dividends."
        }
      ]
    },
    
    // Investment Strategies tab
    {
      title: "Investment Strategies",
      icon: <LightbulbIcon />,
      items: [
        {
          title: "Buy and Hold",
          content: "Buy and hold is a passive investment strategy where an investor buys stocks or other securities and holds them for a long period regardless of fluctuations in the market. The basic premise is that the stock market provides substantial returns to investors when they remain fully invested for the long run, despite periods of volatility or decline. This strategy is based on the belief that the market will provide substantial positive returns over the long term, making timing the market (buying low and selling high) less important than the time spent in the market. The buy and hold approach reduces transaction costs, minimizes capital gains taxes, and requires less time to manage investments. However, it requires patience and the psychological ability to ride out market downturns without selling."
        },
        {
          title: "Value Investing",
          content: "Value investing is an investment strategy that involves picking stocks that appear to be trading for less than their intrinsic or book value. Value investors actively seek stocks they believe the market has undervalued. They believe the market overreacts to good and bad news, resulting in stock price movements that don't correspond to a company's long-term fundamentals. The overreaction offers an opportunity to profit by buying stocks at discounted prices—on sale. Value investors use financial analysis, particularly examining financial ratios such as the P/E ratio, P/B ratio, and debt-to-equity ratio, to identify stocks trading at a discount to their intrinsic value. This approach was popularized by Benjamin Graham and further developed by Warren Buffett."
        },
        {
          title: "Growth Investing",
          content: "Growth investing is a stock-buying strategy that focuses on companies expected to grow at an above-average rate compared to their industry or the broader market. Growth investors typically invest in companies that are expanding their market share, revenue, and profits, even if their current valuations seem high. Instead of focusing on present-day value, as value investors do, growth investors look to the potential future value of a company. These companies are usually in the early or middle stages of their business cycle and are expected to expand rapidly. Growth stocks typically don't pay dividends, as these companies usually reinvest retained earnings in capital projects. Companies in sectors like technology and healthcare often attract growth investors due to their high growth potential. While growth investing can yield substantial returns, it also carries higher risk due to the higher valuations of growth stocks and their vulnerability to market downturns."
        },
        {
          title: "Dollar-Cost Averaging",
          content: "Dollar-cost averaging (DCA) is an investment strategy in which an investor divides up the total amount to be invested across periodic purchases of a target asset in an effort to reduce the impact of volatility on the overall purchase. The purchases occur regardless of the asset's price and at regular intervals; in effect, this strategy removes much of the detailed work of attempting to time the market in order to make purchases of assets at favorable prices. By using dollar-cost averaging, investors may lower their average cost per share and acquire more shares when prices are low and fewer shares when prices are high. This strategy doesn't guarantee profits or protect against losses in declining markets, but it can help reduce the effects of market volatility on investments and may be particularly beneficial in markets that experience regular fluctuations."
        },
        {
          title: "Dividend Investing",
          content: "Dividend investing is a strategy that focuses on buying stocks of companies that pay regular dividends. Dividend investors look for companies with a history of strong dividend payments, preferably those that have consistently increased their dividends over time (known as 'dividend aristocrats'). This strategy is popular among income-focused investors, such as retirees, who rely on investment income to cover living expenses. The appeal of dividend investing lies in its potential to provide two sources of return: regular income through dividend payments and potential capital appreciation of the stock itself. Companies that pay steady dividends are typically more established and financially stable, which can make them less volatile during market downturns. However, dividend stocks may not offer the same growth potential as non-dividend-paying companies that reinvest all their profits back into their business for expansion."
        }
      ]
    },
    
    // Market Indicators tab
    {
      title: "Market Indicators",
      icon: <ShowChartIcon />,
      items: [
        {
          title: "Moving Averages",
          content: "Moving averages are a widely used technical indicator to analyze stock price trends over specific periods. They smooth out price data by creating a constantly updated average price, which helps identify the direction of the trend while filtering out 'noise' from random price fluctuations. The two most common types are:\n\n1. Simple Moving Average (SMA): Calculates the average price over a specific number of periods by adding all the closing prices and dividing by the number of periods.\n\n2. Exponential Moving Average (EMA): Gives more weight to recent prices, making it more responsive to new information.\n\nMoving averages are often used to identify trend direction and support/resistance levels. When a short-term moving average crosses above a longer-term moving average, it's called a 'golden cross' and is considered a bullish signal. Conversely, when a short-term moving average crosses below a longer-term moving average, it's called a 'death cross' and is considered bearish."
        },
        {
          title: "Relative Strength Index (RSI)",
          content: "The Relative Strength Index (RSI) is a momentum oscillator that measures the speed and change of price movements. The RSI oscillates between zero and 100 and is typically used to identify overbought or oversold conditions in a market. Traditional interpretation considers an RSI value of 70 or above to indicate that a security is becoming overbought or overvalued, and therefore might be primed for a trend reversal or corrective price pullback. An RSI reading of 30 or below indicates an oversold or undervalued condition, suggesting a possible trend reversal or price bounce. The RSI can also help identify trend strength and potential breakouts by showing when momentum is building or weakening. Additionally, divergences between the RSI and price movement can signal potential reversals - for example, if a stock makes a new high but the RSI fails to exceed its previous high, this could indicate weakening momentum."
        },
        {
          title: "MACD (Moving Average Convergence Divergence)",
          content: "The Moving Average Convergence Divergence (MACD) is a trend-following momentum indicator that shows the relationship between two moving averages of a security's price. The MACD is calculated by subtracting the 26-period Exponential Moving Average (EMA) from the 12-period EMA. The result of this calculation is the MACD line. A nine-day EMA of the MACD, called the 'signal line,' is then plotted on top of the MACD line, which can function as a trigger for buy and sell signals. Traders may buy the security when the MACD crosses above its signal line and sell—or short—the security when the MACD crosses below the signal line. MACD indicators can also help identify when a security is overbought or oversold. Additionally, the distance between the MACD line and the signal line (known as the histogram) can indicate the strength of a price movement."
        },
        {
          title: "Bollinger Bands",
          content: "Bollinger Bands are a technical analysis tool defined by a set of trend lines plotted two standard deviations (positively and negatively) away from a simple moving average (SMA) of a security's price. Developed by John Bollinger, they can be used to identify whether a price is high or low on a relative basis. The bands expand when volatility increases and contract when volatility decreases. The primary use of Bollinger Bands is to identify potential overbought and oversold conditions. When the price touches or moves beyond the upper band, it suggests that the security might be overbought. Conversely, when the price touches or moves below the lower band, it might indicate an oversold condition. Another common pattern is the 'Bollinger Band squeeze,' which occurs when volatility reaches a relative low, causing the bands to narrow. This often precedes significant price breakouts and can be used to anticipate potential trading opportunities."
        },
        {
          title: "Volume Indicators",
          content: "Volume indicators are technical analysis tools that help traders understand the strength of a price movement based on trading volume. High volume movements are generally considered more significant and more likely to continue than low volume movements. Common volume indicators include:\n\n1. Volume Bars: Simply display the number of shares or contracts traded in a given period. Higher bars indicate higher trading activity.\n\n2. On-Balance Volume (OBV): A cumulative indicator that adds volume on up days and subtracts volume on down days, creating a running total. If OBV is rising while price is flat or falling, it might suggest future upward price movement.\n\n3. Volume Weighted Average Price (VWAP): Calculates the average price a security has traded throughout the day, based on both volume and price. It's often used as a benchmark by institutional traders.\n\n4. Money Flow Index (MFI): Combines price and volume data to identify overbought or oversold conditions, similar to the RSI but incorporating volume as a factor."
        }
      ]
    }
  ];

  return (
    <AnimatedBox>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        {/* Hero Section */}
        <HeroSection>
          {/* Decorative circles */}
          <CircleDecoration sx={{ width: '300px', height: '300px', top: '-150px', right: '-150px', opacity: 0.4 }} />
          <CircleDecoration sx={{ width: '200px', height: '200px', bottom: '-100px', left: '-100px', opacity: 0.3 }} />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Fade in timeout={1000}>
              <Box>
                <Typography variant="overline" sx={{ 
                  fontSize: '1rem', 
                  color: 'rgba(255,255,255,0.9)', 
                  letterSpacing: 3,
                  mb: 1,
                  display: 'block'
                }}>
                  INVESTOR EDUCATION CENTER
                </Typography>
                
                <Typography variant="h2" component="h1" sx={{ 
                  color: '#fff', 
                  fontWeight: 800,
                  mb: 3,
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  maxWidth: { md: '70%' }
                }}>
                  Master the Markets: <FloatIcon component="span" sx={{ display: 'inline-block' }}>
                    Stock Market Knowledge Hub
                  </FloatIcon>
                </Typography>
                
                <Typography variant="h6" sx={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  maxWidth: { md: '60%' },
                  mb: 4,
                  lineHeight: 1.6
                }}>
                  Explore comprehensive resources to build your investing foundation — from market basics to advanced analysis techniques.
                </Typography>
                
                <Grid container spacing={3} sx={{ mb: 2 }}>
                  <Grid item xs={12} md={4}>
                    <Zoom in timeout={1000} style={{ transitionDelay: '200ms' }}>
                      <Paper sx={{ 
                        p: 2, 
                        textAlign: 'center',
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: 2,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          backgroundColor: 'rgba(255,255,255,0.2)',
                        }
                      }}>
                        <FloatIcon>
                          <SchoolIcon sx={{ fontSize: 40, color: '#fff', mb: 1 }} />
                        </FloatIcon>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                          Learn Fundamentals
                        </Typography>
                      </Paper>
                    </Zoom>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Zoom in timeout={1000} style={{ transitionDelay: '400ms' }}>
                      <Paper sx={{ 
                        p: 2, 
                        textAlign: 'center',
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: 2,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          backgroundColor: 'rgba(255,255,255,0.2)',
                        }
                      }}>
                        <FloatIcon>
                          <BarChartIcon sx={{ fontSize: 40, color: '#fff', mb: 1 }} />
                        </FloatIcon>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                          Master Analysis
                        </Typography>
                      </Paper>
                    </Zoom>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Zoom in timeout={1000} style={{ transitionDelay: '600ms' }}>
                      <Paper sx={{ 
                        p: 2, 
                        textAlign: 'center',
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: 2,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          backgroundColor: 'rgba(255,255,255,0.2)',
                        }
                      }}>
                        <FloatIcon>
                          <CalculateIcon sx={{ fontSize: 40, color: '#fff', mb: 1 }} />
                        </FloatIcon>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                          Master Financial Ratios & Metrics
                        </Typography>
                      </Paper>
                    </Zoom>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          </Box>
        </HeroSection>
        
        {/* Tabs for different categories */}
        <Box sx={{ mb: 3 }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              '& .MuiTab-root': {
                minHeight: 60,
                py: 1
              }
            }}
          >
            {tabContent.map((tab, index) => (
              <Tab 
                key={index} 
                label={tab.title} 
                icon={tab.icon} 
                iconPosition="start" 
                sx={{ fontWeight: 500 }}
              />
            ))}
          </Tabs>
        </Box>
        
        {/* Content for current tab */}
        <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
            {tabContent[currentTab].icon}
            <Box component="span" sx={{ ml: 1 }}>{tabContent[currentTab].title}</Box>
          </Typography>
          
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            {tabContent[currentTab].items.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Accordion defaultExpanded={index === 0}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {item.content.split('\n\n').map((paragraph, idx) => (
                      <Typography key={idx} paragraph>
                        {paragraph}
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </AnimatedBox>
  );
}

export default Education; 