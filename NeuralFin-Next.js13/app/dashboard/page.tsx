'use client'


import { useEffect, useState } from 'react';
import { getStocks, getTransactions, createTransaction, Stock, Transaction } from './api';
import StockList from './dashboard_components/StockList';
import TransactionList from './dashboard_components/TransactionList';
import TransactionForm from './dashboard_components/TransactionForm';

const Portfolio = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [shares, setShares] = useState(0);
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy');

  useEffect(() => {
    const fetchData = async () => {
      setStocks(await getStocks());
      setTransactions(await getTransactions());
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedStock) return;

    const newTransaction = {
      stock: selectedStock,
      shares: shares,
      transaction_type: transactionType,
    };
    const createdTransaction = await createTransaction(newTransaction);
    setTransactions([...transactions, createdTransaction]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StockList stocks={stocks} />
        <TransactionList transactions={transactions} />
      </div>
      <div className="mt-8">
        <TransactionForm
          stocks={stocks}
          onSubmit={handleSubmit}
          selectedStock={selectedStock}
          setSelectedStock={setSelectedStock}
          shares={shares}
          setShares={setShares}
          transactionType={transactionType}
          setTransactionType={setTransactionType}
        />
      </div>
    </div>
  );
};

export default Portfolio;
