// No hooks, no state, just static HTML inside a React component
const EducationStatic = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Stock Market Education</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Stock Market Basics</h2>
        <p>The stock market is a collection of exchanges where stocks (pieces of ownership in businesses) are bought and sold. It provides companies with access to capital and investors with a slice of ownership in the company.</p>
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Stock Analysis Methods</h2>
        <p>Fundamental analysis evaluates a company's intrinsic value by examining related economic and financial factors.</p>
        <p>Technical analysis uses price charts and patterns to predict future price movements.</p>
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Financial Ratios</h2>
        <div style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>P/E Ratio (Price-to-Earnings)</h3>
          <p>The P/E ratio measures a company's current share price relative to its earnings per share (EPS).</p>
          <p><strong>Formula:</strong> Share Price / Earnings Per Share</p>
          <p><strong>Example:</strong> If a company trades at ₹100 per share and has EPS of ₹5, the P/E ratio is 20x.</p>
        </div>
        
        <div style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>P/B Ratio (Price-to-Book)</h3>
          <p>The P/B ratio compares a company's market capitalization to its book value.</p>
          <p><strong>Formula:</strong> Share Price / Book Value Per Share</p>
          <p><strong>Example:</strong> If a stock trades at ₹50 and has a book value of ₹25 per share, the P/B ratio is 2x.</p>
        </div>
      </div>
    </div>
  );
};

export default EducationStatic; 