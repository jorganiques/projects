import { useState, useEffect } from 'react'; 
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Button from './Button';

const AddTransaction = () => {
  const { userId, jarId } = useParams();
  const [transactionType, setTransactionType] = useState('Deposit');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [jarName, setJarName] = useState('');

  useEffect(() => {
    const storedJarName = localStorage.getItem(`jarName_${jarId}`);
    
    if (storedJarName) {
      setJarName(storedJarName);
    } else {
      const fetchJarName = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jars/${userId}/${jarId}`);
          setJarName(response.data.jarName);
          localStorage.setItem(`jarName_${jarId}`, response.data.jarName);
        } catch (err) {
          console.error('Failed to fetch jar name:', err);
        }
      };

      fetchJarName();
    }
  }, [userId, jarId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/transactions`, {
        userId,
        jarId,
        transactionType,
        amount
      });

      setSuccessMessage('Transaction created successfully');
      setAmount('');
      setTransactionType('Deposit');
      setError(null);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add transaction');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          Add Transaction to Jar: {jarName || 'Loading...'} (ID: {jarId})
        </h1>

        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="transactionType" className="font-semibold">Transaction Type</label>
            <select
              id="transactionType"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="Deposit">Deposit</option>
              <option value="Withdrawal">Withdrawal</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="amount" className="font-semibold">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
              placeholder="Enter amount"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <Button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
          >
            Submit Transaction
          </Button>
        </form>

        <div className="mt-4 flex justify-center">
          <Link
            to={`/transactions/${userId}/${jarId}`}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
          >
            Back to Transactions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
