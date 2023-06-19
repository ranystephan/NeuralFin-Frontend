'use client'



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

import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/innerDashComponents/skeleton';

export function TransactionList({ refreshKey }: { refreshKey: number }) {
  const [transactions, setTransactions] = useState<PortfolioItem[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl_deployed = `https://api.neuralfin.xyz/api/portfolio/portfolio-items/`;
      const apiUrl_local = `http://localhost:8000/api/portfolio/portfolio-items/`;
      
      const response = await fetch(`https://api.neuralfin.xyz/api/portfolio/portfolio-items/`, {
        credentials: 'include',
      });
      const data = await response.json();
      data.sort((a: PortfolioItem, b: PortfolioItem) => {
        // Compare the transaction dates in descending order
        return new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime();
      });
      setTransactions(data);
    };

    fetchData();
  }, [refreshKey]);


  if (!transactions) {
    return <div>
      <Skeleton className="h-8 w-full bg-gray-400 my-4" />
      <Skeleton className="h-8 w-full bg-gray-400 my-4" />
      <Skeleton className="h-8 w-full bg-gray-400 my-4" />
      <Skeleton className="h-8 w-full bg-gray-400 my-4" />
    </div>;
  }


  return (
    <table className="table-auto w-full text-left border-collapse">
      <thead>
        <tr className="">
          <th className="px-4 py-2">Ticker</th>
          <th className="px-4 py-2">Shares</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Type</th>
          <th className="px-4 py-2">Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id} className="border-t border-gray-800">
            <td className="px-4 py-3">{transaction.stock_symbol}</td>
            <td className="px-4 py-2">{transaction.shares}</td>
            <td className="px-4 py-2">{transaction.purchase_price}</td>
            <td className="px-4 py-2">{transaction.transaction_type}</td>
            <td className="px-4 py-2">{new Date(transaction.transaction_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

}