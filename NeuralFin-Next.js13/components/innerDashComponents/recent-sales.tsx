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

export function TransactionList() {
  const [transactions, setTransactions] = useState<PortfolioItem[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://neuralfin-backend-production.up.railway.app/api/portfolio/portfolio-items/', {
        credentials: 'include',
      });
      const data = await response.json();
      setTransactions(data.results);
    };

    fetchData();
  }, []);

  if (!transactions) {
    return <div>Loading...</div>;
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




/* import { Avatar, AvatarFallback, AvatarImage } from "@/components/innerDashComponents/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Olivia Martin</p>
          <p className="text-sm text-muted-foreground">
            olivia.martin@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+$1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jackson Lee</p>
          <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
          <p className="text-sm text-muted-foreground">
            isabella.nguyen@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+$299.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">William Kim</p>
          <p className="text-sm text-muted-foreground">will@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$99.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>
    </div>
  )
} */