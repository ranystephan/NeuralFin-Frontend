import { SetStateAction, useState } from 'react';

type OverviewData = {
  Empty: string;
  Name: string;
  Description: string;
  Sector: string;
  Exchange: string;
  AnalystTargetPrice: number;
  DividendDate: string;
  DividendYield: number;
  Beta: number,
  EPS: number,
  PERatio: number,
  EVToEBITDA: number,
  EVToRevenue: number,
  ProfitMargin: number,
  MarketCapitalization: number,


};


const styles = {
  wrapper: "overflow-hidden",
  companyName: "text-2xl font-bold mb-2",
  sector: "text-sm text-gray-400 font-bold mb-1 font-mono",
  description: "text-sm text-gray-400 mb-2",
  metrics: "text-sm text-gray-400 font-bold",
  metricsData: "text-sm text-gray-600 font-bold",
};


function formatMarketCap(value: number): string {
  if (value >= 1e12) {
    return (value / 1e12).toFixed(2) + 'T';
  } else if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B';
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + 'M';
  } else {
    return value.toString();
  }
}


function StockForm(props: { onSymbolChange: (arg0: string) => void; }) {
  const [symbol, setSymbol] = useState('');
  const [overviewData, setOverviewData] = useState(null as OverviewData | null);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  async function fetchOverviewData() {
    try {
      setIsLoading(true);
      const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`);
      const data = await response.json();
      if (Object.keys(data).length === 0) {
        setOverviewData( null );
      } else {
        setOverviewData(data);
      }
        setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching overview data:', error);
    }
  }


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.onSymbolChange(symbol);
    if (symbol.trim() !== ''){
      fetchOverviewData();
    } else {
      setOverviewData(null);
    }

  }

  const handleSymbolChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSymbol(event.target.value);
  };


  console.log(overviewData);

  return (
    <div>
      <div className={`${styles.wrapper} `}>
        <div className="px-4 sm:px-6">
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor='stock-ticker' />
              <div className="mt-2 flex mb-4">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm font-mono">
                  Symbol
                </span>
                <input
                  type="text"
                  value={symbol}
                  onChange={handleSymbolChange}
                  name="stock-ticker"
                  id="stock-ticker"
                  className="font-mono block w-full p-4 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                  placeholder="Example: 'AAPL'"
                />
              </div>
              {isLoading ? (
                <div>
                  <div className="flex items-center justify-center">
                    <span className="mr-2">Loading...</span>
                    <div className="w-6 h-6 border-4 border-gray-400 rounded-full animate-spin"></div>
                  </div>
                </div>
              ) : (
                <div>
                  {overviewData?.Empty === 'Empty' && 
                    <div>
                      <div className="flex items-center justify-center h-24 text-lg text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                        </svg>
                        <span>We're sorry, but this stock is not yet available</span>
                      </div>

                    </div>
                  }
                  {overviewData === null && 
                    <div>
                      <div className={styles.companyName}>NeuralFin</div>
                      <div className={styles.sector}>FINTECH - TECHNOLOGY</div>
                      <div className={`${styles.description}`}>
                        NeuralFin is a Fintech startup that is disrupting the investment industry through its cutting-edge technology and AI-powered platform. The company aims to provide a comprehensive platform for stock market analysis and investment recommendations, with a user-friendly interface and transparent fee structure.
                        NeuralFin's mission is to democratize finance by making information and tools available to everyone.
                      </div>
                    </div>
                  }
                  {overviewData && (
                    <div>
                      <div>
                        <div className={styles.companyName}>{overviewData.Name}</div>
                        <div className={styles.sector}>{overviewData.Sector}</div>
                        <div className={styles.description}>{overviewData.Description}</div>
                        <div className='flex justify-between mt-1 mb-1'>
                          <div className={styles.metrics}>Exchange</div>
                          <div className={styles.metricsData}>{overviewData.Exchange}</div>
                        </div>
                        <div className='flex justify-between mt-1 mb-1'>
                          <div className={styles.metrics}>Market Cap</div>
                          <div className={styles.metricsData}>
                            {overviewData && formatMarketCap(Number(overviewData.MarketCapitalization))}
                          </div>
                        </div>
                        <div className='flex justify-between mt-1 mb-1'>
                          <div className={styles.metrics}>Target Price</div>
                          <div className={styles.metricsData}>{overviewData.AnalystTargetPrice}</div>
                        </div>
                        <div className='flex justify-between mt-1 mb-1'>
                          <div className={styles.metrics}>Yield</div>
                          <div className={styles.metricsData}>{(overviewData.DividendYield * 100).toFixed(2)}%</div>
                        </div>
                        <div className='flex justify-between mt-1 mb-1'>
                          <div className={styles.metrics}>Div Date</div>
                          <div className={styles.metricsData}>{overviewData.DividendDate}</div>
                        </div>
                        <div className='flex justify-between mt-1 mb-1'>
                          <div className={styles.metrics}>Beta</div>
                          <div className={styles.metricsData}>{overviewData.Beta}</div>
                        </div>
                        <div className='flex justify-between mt-1 mb-1'>
                          <div className={styles.metrics}>EPS</div>
                          <div className={styles.metricsData}>{overviewData.EPS}</div>
                        </div>
                        <div className='flex justify-between mt-1 mb-1'>
                          <div className={styles.metrics}>PE Ratio</div>
                          <div className={styles.metricsData}>{overviewData.PERatio}</div>
                        </div>
                        <div className='flex justify-between mt-1 mb-1'>
                          <div className={styles.metrics}>EV/EBITDA</div>
                          <div className={styles.metricsData}>{overviewData.EVToEBITDA}</div>
                        </div>
                        <div className='flex justify-between mt-1 mb-1'>
                          <div className={styles.metrics}>EV/Revenue</div>
                          <div className={styles.metricsData}>{overviewData.EVToRevenue}</div>
                        </div>
                        <div className='flex justify-between mt-1 mb-1'>
                          <div className={styles.metrics}>Profit Margin</div>
                          <div className={styles.metricsData}>{overviewData.ProfitMargin}</div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
                
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockForm;
