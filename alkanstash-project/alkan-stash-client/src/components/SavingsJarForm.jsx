import { useState, useEffect } from 'react';    
import axios from 'axios'; 
import { useNavigate, Link  } from 'react-router-dom';
import Button from './Button'; 

const SavingsJarForm = () => {
  const [jarName, setJarName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); 
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/user/${username}`);
        setUserId(response.data.userId);
      } catch (error) {
        setError('Failed to retrieve user ID.');
        console.error('Error fetching user ID:', error);
      }
    };

    if (username) {
      fetchUserId();
    }
  }, [username]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId) {
      setError('User ID is required.');
      return;
    }

    try {
      const jarData = { 
        jarName,
        targetAmount: Number(targetAmount), 
        notes,
        userId
      };

      await axios.post('http://localhost:5000/api/jars', jarData);
      
      // Set success message
      setSuccessMessage('Savings jar created successfully!');
      setError('');
      
      navigate('/dashboard'); 
      
      setJarName('');
      setTargetAmount('');
      setNotes('');
    } catch (err) {
      setError('Failed to create savings jar.');
      setSuccessMessage(''); 
      console.error('Error creating savings jar:', err); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Jar Name</label>
            <input
              type="text"
              value={jarName} 
              onChange={(e) => setJarName(e.target.value)} 
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Target Amount</label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              rows="4"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>} 
        
          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-700 transition duration-300"
            >
              Create Jar
            </Button>
          </div>
          <div className="flex justify-center mt-4">
            <Link
            to="/dashboard"
            className="bg-gray-500 text-white hover:bg-gray-700 transition duration-300 px-4 py-2 rounded text-center"
          >
            Back to Jars Overview
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SavingsJarForm;
