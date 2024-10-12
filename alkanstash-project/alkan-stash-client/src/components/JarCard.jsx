import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JarCard = ({ jar, onJarDeleted }) => {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [error, setError] = useState(null);
  const [transactionsExist, setTransactionsExist] = useState(true);

  const userId = localStorage.getItem('userId'); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!jar || !userId) return;

      try {
        // Use userId and jarId in the GET request
        const transactionsResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/transactions/${userId}/${jar.jarId}`);
        const transactions = transactionsResponse.data;

        if (transactions.length === 0) {
          setTransactionsExist(false);
        }

        const total = transactions.reduce((sum, transaction) => {
          if (transaction.transactionType === 'Deposit') {
            return sum + transaction.amount;
          } else if (transaction.transactionType === 'Withdrawal') {
            return sum - transaction.amount;
          }
          return sum;
        }, 0);

        setCurrentAmount(total);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchTransactions();
  }, [jar, userId]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the jar "${jar.jarName}"?`)) {
      try {
        // Use userId and jarId in the DELETE request
        const jarDeleteResponse = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/jars/${userId}/${jar.jarId}`);
        console.log('Jar delete response:', jarDeleteResponse);

        // Only attempt to delete transactions if they exist
        if (transactionsExist) {
          const transactionsDeleteResponse = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/transactions/${userId}/${jar.jarId}`);
          console.log('Transactions delete response:', transactionsDeleteResponse);
        }

        onJarDeleted();  
      } catch (error) {
        console.error('Error deleting jar:', error);
        setError('Error deleting jar');
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-semibold mb-2">{jar.jarName}</h2>
      <div>
        <p>Saved: <span className="font-bold text-green-500">₱{currentAmount}</span></p>
        <p>Target: <span className="font-bold text-blue-500">₱{jar.targetAmount || 0}</span></p>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="flex justify-between">
        {/* Update the navigation paths to use userId and jarId */}
        <button onClick={() => navigate(`/transactions/${userId}/${jar.jarId}`)} className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300">View Transactions</button>
        <button onClick={() => navigate(`/editJar/${userId}/${jar.jarId}`)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Edit Jar</button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete Jar</button>
      </div>
    </div>
  );
};

export default JarCard;
