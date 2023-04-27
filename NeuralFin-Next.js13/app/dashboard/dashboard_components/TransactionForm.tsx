import { Stock } from '../api';

interface TransactionFormProps {
  stocks: Stock[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  selectedStock: Stock | null;
  setSelectedStock: React.Dispatch<React.SetStateAction<Stock | null>>;
  shares: number;
  setShares: React.Dispatch<React.SetStateAction<number>>;
  transactionType: string;
  setTransactionType: React.Dispatch<React.SetStateAction<string>>;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  stocks,
  onSubmit,
  selectedStock,
  setSelectedStock,
  shares,
  setShares,
  transactionType,
  setTransactionType,
}) => {
  return (
    <form onSubmit={onSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
      <div>
        <label htmlFor="stock" className="block mb-1">
          Stock:
        </label>
        <select
          id="stock"
          className="w-full border p-2 rounded"
          value={selectedStock?.id || ''}
          onChange={(e) =>
            setSelectedStock(stocks.find((stock) => stock.id === parseInt(e.target.value)) || null)
          }
        >
          <option value="" disabled>
            Select a stock
          </option>
          {stocks.map((stock) => (
            <option key={stock.id} value={stock.id}>
              {stock.symbol} - {stock.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label htmlFor="shares" className="block mb-1">
          Shares:
        </label>
        <input
          id="shares"
          type="number"
          className="w-full border p-2 rounded"
          value={shares}
          onChange={(e) => setShares(parseInt(e.target.value))}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="transactionType" className="block mb-1">
          Transaction Type:
        </label>
        <select
          id="transactionType"
          className="w-full border p-2 rounded"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </div>
      <div className="mt-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Transaction
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;

