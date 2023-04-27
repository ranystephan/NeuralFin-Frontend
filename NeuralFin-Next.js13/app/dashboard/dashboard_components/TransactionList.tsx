import { Transaction } from '@/app/dashboard/api';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} className="py-1">
            {transaction.transaction_type.toUpperCase()} - {transaction.stock.symbol} - {transaction.shares} shares
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
