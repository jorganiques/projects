import { useState, useEffect } from 'react';  
import { useNavigate, useParams, Link } from 'react-router-dom'; 
import axios from 'axios';
import Button from './Button';

const TransactionHistory = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId, jarId } = useParams();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Updated endpoint to use userId and jarId
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/transactions/${userId}/${jarId}`);
        setTransactions(response.data); // Set the fetched transactions to state
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId, jarId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Transaction History for Jar ID: {jarId}</h1>
        
        <table className="w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Transaction Type</th>
              <th className="px-4 py-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{new Date(transaction.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{transaction.transactionType}</td>
                  <td className="px-4 py-2 text-right">₱{transaction.amount.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-2 text-center">No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex flex-col items-center space-y-4 mt-4">
          <Button
            onClick={() => navigate(`/AddTransaction/${userId}/${jarId}`)}
            className="bg-blue-500 text-white hover:bg-blue-700 transition duration-300"
          >
            Add Transaction
          </Button>
          
          <Link
            to="/dashboard"
            className="bg-gray-500 text-white hover:bg-gray-700 transition duration-300 px-4 py-2 rounded text-center"
          >
            Back to Jars Overview
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
