import axios from 'axios';

const API_URL = 'http://localhost:8000/api/portfolio'; // Replace with your Django backend URL

export interface Stock {
  id: number;
  symbol: string;
  name: string;
}

export interface Transaction {
  id: number;
  user: number;
  stock: Stock;
  shares: number;
  transaction_type: 'buy' | 'sell';
  created_at: string;
}

export const getStocks = async () => {
  const response = await axios.get<Stock[]>(`${API_URL}/stocks/`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const getTransactions = async () => {
  const response = await axios.get<Transaction[]>(`${API_URL}/transactions/`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const createTransaction = async (transactionData: Omit<Transaction, 'id' | 'created_at' | 'user'>) => {
  const response = await axios.post<Transaction>(`${API_URL}/transactions/`, transactionData, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};


export const getStockInfo = async (symbol: string) => {
  const response = await axios.get(`${API_URL}/stock_info/${symbol}/`);
  return response.data;
};
