/* 'use client'

import React, { useState } from 'react';
import axios from 'axios';


interface StockProps {
  stock: {
    id: number;
    symbol: string;
    quantity: number;
    purchasePrice: number;
}; }



const Stock: React.FC<StockProps> = ({ stock }) => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  // Render the stock information

  const addStock = async () => {
  try {
    // Call the backend API to add the stock to the user's portfolio
    const response = await axios.post('/api/portfolio/add-stock', {
      symbol,
      quantity,
    });
    // Check if the response contains an error message
    if (response.data.error) {
      setErrorMessage(response.data.error);
    } else {
      // Clear the input fields and error message
      setSymbol('');
      setQuantity(0);
      setErrorMessage('');
    }
  } catch (error) {
    console.log('Error adding stock:', error);
  }
};



  return (

    <div className="stock">
      <h3>{stock.symbol}</h3>
      <p>Quantity: {stock.quantity}</p>
      <p>Purchase Price: {stock.purchasePrice}</p>
      <div>

        <h2>Add Stock</h2>
        <input
          type="text"
          placeholder="Stock Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <button onClick={addStock}>Add Stock</button>
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    </div>
  );




};

export default Stock; */