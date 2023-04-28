import { SetStateAction, useState } from 'react';

type OverviewData = {
  Name: string;
  Exchange: string;
  Description: string;
  Sector: string;
  Empty : string;

};


type RiskData = {
  symbol: string;
  risk_score: number;
}

const styles = {
  wrapper: "overflow-hidden",
  companyName: "text-2xl font-bold mb-2 font-mono",
  sector: "text-sm text-gray-400 font-bold mb-1 font-mono",
  description: "text-sm text-gray-400",
};

function StockForm(props: { onSymbolChange: (arg0: string) => void; }) {
  const [symbol, setSymbol] = useState('');
  const [overviewData, setOverviewData] = useState(null as OverviewData | null);
  const [riskData, setRiskData] = useState(null as RiskData | null);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  async function fetchOverviewData() {
    try {
      setIsLoading(true);
      const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`);
      const secondresp = await fetch(`https://neuralfin-backend-production.up.railway.app/api/risk/stockRisk/${symbol}`);
      const data = await response.json();
      const riskdata = await secondresp.json();
      if (Object.keys(data).length === 0) {
        setOverviewData( {Name: '', Exchange: '', Description: '', Sector: '', Empty: 'Empty'} );
        setRiskData( {symbol: 'SPY', risk_score: 4.2} );
      } else {
        setOverviewData(data);
        setRiskData(riskdata);
      }
        setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching overview data:', error);
    }
  }

  async function fetchRiskData() {
    try {
      setIsLoading(true);
      const response = await fetch(`https://neuralfin-backend-production.up.railway.app/api/risk/stockRisk/${symbol}`);
      const data = await response.json();
      console.log("RISK DATA!");
      console.log(data);
      
      if (Object.keys(data).length === 0) {
        setRiskData( {symbol: '', risk_score: 0} );
      } else {
        setRiskData(data);
      }
        setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching risk score data:', error);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.onSymbolChange(symbol);
    if (symbol.trim() !== ''){
      fetchOverviewData();
      fetchRiskData();
    } else {
      setOverviewData(null);
      setRiskData(null);
    }

  }

  const handleSymbolChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSymbol(event.target.value);
  };




  return (
    <div>
      <div className={styles.wrapper}>
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
                      <div className={styles.description}>
                        NeuralFin is a Fintech startup that is disrupting the investment industry through its cutting-edge technology and AI-powered platform. The company aims to provide a comprehensive platform for stock market analysis and investment recommendations, with a user-friendly interface and transparent fee structure.
                        NeuralFin's mission is to democratize finance by making information and tools available to everyone.
                      </div>
                    </div>
                  }
                  {overviewData && (
                    <div>
                      <div className={styles.companyName}>{overviewData.Name}</div>
                      <div className={styles.sector}>{overviewData.Sector}</div>
                      <div className={styles.description}>{overviewData.Description}</div>
                    </div>
                  )}
                  {riskData && (
                    <div>
                      <div className={styles.sector}>Risk Score</div>
                      <div className="flex items-center justify-center h-24 text-black bg-red-500 bg-opacity-40 rounded-lg">
                        {riskData.risk_score}
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
