'use client'

import { useState } from 'react';
import NewsBar from './NewsBar';


type OverviewData = {
  Name: string;
  Exchange: string;
  Description: string;
};



const styles = {
  wrapper: "overflow-hidden",
  companyName: "text-2xl font-bold mb-4",
  description: "text-sm text-gray-400",

}

function StockForm() {
  const [symbol, setSymbol] = useState('');
  const [overviewData, setOverviewData] = useState(null as OverviewData | null);
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  

  async function fetchOverviewData() {
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`);
      const data = await response.json();
      setOverviewData(data);
    } catch (error) {
      console.error('Error fetching overview data:', error);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetchOverviewData();
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <div className="px-4 sm:px-6">
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor='stock-ticker' />
              <div className="mt-2 flex mb-4">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                    Symbol
                  </span>
                  <input
                    type="text"
                    value={symbol} 
                    onChange={event => setSymbol(event.target.value)}
                    name="stock-ticker"
                    id="stock-ticker"
                    className="block w-full p-4 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                    placeholder="AAPL"
                  />
                </div>
              {overviewData ? (
                <div>
                  <div className={styles.companyName}>{overviewData.Name}</div>
                  <div className={styles.description}>{overviewData.Description}</div>
                </div>
              ) : (
                <div>Loading...</div>
              )}

            </form>
          </div>
        </div>
      </div>
      <NewsBar symbol={symbol} />
    </div>
  );
}

export default StockForm;
