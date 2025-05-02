// Expanded mock news data with full content
export const getMockNewsData = () => [
  {
    uuid: '1',
    title: 'Federal Reserve Signals Potential Rate Cut in Coming Months',
    description: 'The Federal Reserve indicated it may start cutting interest rates soon as inflation pressures ease.',
    fullContent: `The Federal Reserve indicated it may start cutting interest rates soon as inflation pressures ease.

Following the latest Federal Open Market Committee (FOMC) meeting, Chair Jerome Powell suggested that the central bank is preparing to pivot from its tight monetary policy stance as economic data shows inflation trending closer to the 2% target.

"We're seeing consistent progress on disinflation, and if these trends continue, we may be in a position to adjust our policy stance," Powell stated during the press conference.

Market analysts view this development as a potential catalyst for equity markets, with rate-sensitive sectors like technology and real estate expected to benefit most from lower borrowing costs.

The committee maintained its benchmark rate at the current level of 5.25%-5.50%, but updated its forward guidance to indicate that rate cuts could begin within the next two meetings, depending on incoming economic data.

Treasury yields fell immediately following the announcement, with the 10-year note dropping below 4.2%, while major stock indices rallied on the news.`,
    published_at: new Date().toISOString(),
    source: 'Market News',
    url: '/news/1',
    symbols: ['SPY', 'QQQ', 'DIA'],
    sentiment: { polarity: 0.65, neg: 0.1, neu: 0.25, pos: 0.65 }
  },
  {
    uuid: '2',
    title: 'Apple Unveils New AI Features for iPhone at Developer Conference',
    description: 'Apple announced major AI enhancements coming to iPhone in its latest software update.',
    fullContent: `Apple announced major AI enhancements coming to iPhone in its latest software update at its annual Worldwide Developers Conference (WWDC).

The tech giant revealed that iOS 18 will incorporate a suite of on-device AI capabilities branded as "Apple Intelligence," representing the company's most significant update to its mobile operating system in years.

"This is a transformative moment for our products," said Apple CEO Tim Cook during the keynote presentation. "Apple Intelligence will fundamentally change how users interact with their devices."

The new features include enhanced natural language processing for Siri, contextual understanding of user behavior, predictive text suggestions, and advanced photo editing capabilities powered by generative AI.

Unlike some competitors, Apple emphasized that most AI processing will happen directly on the device rather than in the cloud, highlighting the company's focus on privacy and security.

Wall Street analysts responded positively to the announcement, with several raising their price targets for Apple stock. Industry experts believe these features could drive a significant upgrade cycle among existing iPhone users.

Apple also announced partnerships with OpenAI to integrate ChatGPT functionality and Google to enhance search capabilities, marking a strategic shift in the company's approach to third-party collaborations.`,
    published_at: new Date(Date.now() - 3600000).toISOString(),
    source: 'Tech Report',
    url: '/news/2',
    symbols: ['AAPL', 'MSFT', 'GOOGL'],
    sentiment: { polarity: 0.45, neg: 0.15, neu: 0.4, pos: 0.45 }
  },
  {
    uuid: '3',
    title: 'Oil Prices Drop as Global Demand Forecasts Weaken',
    description: 'Crude oil prices fell sharply as economic data suggested weaker demand outlook.',
    fullContent: `Crude oil prices fell sharply as economic data suggested weaker demand outlook in major economies.

West Texas Intermediate (WTI) crude futures dropped below $75 per barrel, while Brent crude, the international benchmark, declined to $78 per barrel, marking a three-month low for both benchmarks.

The International Energy Agency (IEA) revised its global oil demand growth forecast downward, citing persistent economic weakness in China and slower-than-expected industrial activity in Europe.

"The combination of economic headwinds in key consumption regions and growing non-OPEC+ supply is creating significant pressure on crude prices," said an IEA spokesperson.

Adding to the bearish sentiment, U.S. crude inventories rose by 3.2 million barrels last week, considerably higher than the 1.5 million barrel increase analysts had predicted, according to the Energy Information Administration (EIA).

OPEC+ members are now facing increased pressure to consider extending or deepening production cuts at their upcoming meeting. Saudi Arabia's energy minister indicated that the coalition remains ready to take further action if necessary to stabilize the market.

Energy stocks declined across major indices, with integrated oil companies and exploration firms experiencing the largest losses. Analysts suggest this trend could continue if demand concerns persist through the summer driving season.`,
    published_at: new Date(Date.now() - 7200000).toISOString(),
    source: 'Energy Insider',
    url: '/news/3',
    symbols: ['USO', 'XOM', 'CVX'],
    sentiment: { polarity: -0.55, neg: 0.55, neu: 0.35, pos: 0.1 }
  },
  {
    uuid: '4',
    title: 'Reliance Industries Reports Strong Quarterly Growth',
    description: 'Indian conglomerate Reliance Industries posted better-than-expected quarterly results.',
    fullContent: `Indian conglomerate Reliance Industries posted better-than-expected quarterly results, driven by strong performance across its diversified business segments.

The company reported a net profit of ₹19,200 crore (approximately $2.3 billion) for the quarter, representing a 15% increase year-over-year and exceeding analyst estimates of ₹18,400 crore.

Reliance's retail division showed particularly impressive growth, with revenue increasing 22% compared to the same period last year. The digital services segment, which includes Jio Platforms, also performed well with a 17% revenue increase.

"Our consistent focus on operating discipline and capital efficiency has resulted in strong financial performance across all our business segments," said Mukesh Ambani, Chairman and Managing Director of Reliance Industries, in a statement.

The company also announced plans to expand its renewable energy investments, allocating an additional $10 billion toward solar manufacturing facilities and green hydrogen production over the next five years.

Indian equity markets responded positively to the news, with Reliance shares gaining over 3% in trading following the announcement. The strong performance also lifted sentiment for the broader Nifty index.

Analysts have upgraded their outlook for the company, with several major investment banks raising their target prices for Reliance shares based on the robust performance and favorable growth prospects.`,
    published_at: new Date(Date.now() - 10800000).toISOString(),
    source: 'India Business',
    url: '/news/4',
    symbols: ['RELIANCE.NS', 'NIFTY'],
    sentiment: { polarity: 0.7, neg: 0.05, neu: 0.25, pos: 0.7 }
  },
  {
    uuid: '5',
    title: 'Tesla Recalls 200,000 Vehicles Over Software Issue',
    description: 'Electric vehicle maker Tesla announced a recall affecting several of its models.',
    fullContent: `Electric vehicle maker Tesla announced a recall affecting approximately 200,000 vehicles due to a software issue that could potentially impact the backup camera display.

The recall covers certain Model 3, Model Y, and Model S vehicles manufactured between 2023 and 2024. According to documents filed with the National Highway Traffic Safety Administration (NHTSA), the software glitch can cause the backup camera feed to fail or display with a significant delay when the car is in reverse.

Tesla stated that it identified the problem during internal quality testing and has not received reports of any accidents or injuries related to the issue. The company emphasized that all other vehicle functions, including automated driving features, remain unaffected.

"We're addressing this proactively as part of our commitment to safety," said a Tesla spokesperson. "The fix will be delivered via an over-the-air software update, so owners won't need to bring their vehicles to service centers."

The software update is expected to roll out within the next two weeks to all affected vehicles. This marks Tesla's second significant recall this year, following a January action affecting 1.1 million vehicles for a separate software-related concern.

Despite the announcement, Tesla shares showed minimal movement in trading, as investors have become accustomed to the company's practice of addressing issues through remote software updates rather than traditional physical recalls.`,
    published_at: new Date(Date.now() - 18000000).toISOString(),
    source: 'Auto News',
    url: '/news/5',
    symbols: ['TSLA'],
    sentiment: { polarity: -0.4, neg: 0.4, neu: 0.5, pos: 0.1 }
  }
]; 