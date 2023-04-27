import { Stock } from '@/app/dashboard/api';

interface StockListProps {
  stocks: Stock[];
}

const StockList: React.FC<StockListProps> = ({ stocks }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Available Stocks</h2>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id} className="py-1">
            {stock.symbol} - {stock.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;
