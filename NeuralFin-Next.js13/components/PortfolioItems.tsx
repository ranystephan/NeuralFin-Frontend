'use client'

import { useEffect, useState } from 'react';

type PortfolioItem = {
  id: number;
  portfolio: number;
  stock: number;
  stock_symbol: string;
  shares: number;
  purchase_price: string;
  transaction_type: string;
  transaction_date: string;
};



const PortfolioItems = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[] | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      const apiUrl_deployed = `https://api.neuralfin.xyz/api/portfolio/portfolio-items/`;
      const apiUrl_local = `http://localhost:8000/api/portfolio/portfolio-items/`;
      
      const response = await fetch(apiUrl_deployed, {
        credentials: 'include',
        signal: abortController.signal,
      });
      const data = await response.json();
      setPortfolioItems(data.results);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white shadow-md rounded p-4 text-black">
      <h2 className="text-xl font-bold mb-4">Portfolio Items</h2>
      {portfolioItems ? (
        <ul>
          {portfolioItems.map((item) => (
            <li key={item.id} className="flex justify-between py-2">
              <span className="font-semibold">{item.stock_symbol}</span>
              <span>{item.shares} shares</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PortfolioItems;
