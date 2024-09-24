import { useState, useEffect } from 'react';  
import { useNavigate, useParams, Link } from 'react-router-dom';   
import axios from 'axios';

const EditJar = () => {
  const { jarId } = useParams();   
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState(0);   
  const [notes, setNotes] = useState('');   
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');  
  const navigate = useNavigate();
  
  const userId = localStorage.getItem('userId');   

  useEffect(() => {
    // Fetch jar details on component mount
    const fetchJarDetails = async () => {
      try {
        // Use userId and jarId in the GET request
        const response = await axios.get(`http://localhost:5000/api/jars/${userId}/${jarId}`);
        const jar = response.data;
        setName(jar.name);
        setTargetAmount(jar.targetAmount || 0);   
        setNotes(jar.notes || '');   
      } catch (err) {
        setError('Failed to fetch jar details');
        console.error(err);
      }
    };

    fetchJarDetails();
  }, [userId, jarId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use userId and jarId in the PUT request
      await axios.put(`http://localhost:5000/api/jars/${userId}/${jarId}`, {
        targetAmount: targetAmount || 0,   
        notes: notes || '',   
      });

      // Set success message instead of navigating away
      setSuccessMessage('Jar updated successfully');
      setError(null);  
    } catch (err) {
      setError('Failed to update jar');
      setSuccessMessage('');  
      console.error(err);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Jar</h1>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="font-semibold">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              readOnly
              className="border border-gray-300 rounded-md p-2 w-full bg-gray-100 cursor-not-allowed"
              placeholder="Jar name"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="targetAmount" className="font-semibold">Target Amount</label>
            <input
              type="number"
              id="targetAmount"
              value={targetAmount || 0}  // Fallback for undefined values
              onChange={(e) => setTargetAmount(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter target amount"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="notes" className="font-semibold">Notes</label>
            <textarea
              id="notes"
              value={notes || ''}  // Fallback for undefined values
              onChange={(e) => setNotes(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter any notes here"
              rows="4"
            />
          </div>

          <div className="flex flex-col space-y-4">
            {/* Save Changes button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Save Changes
            </button>

            {/* Back to Jars Overview link, placed below Save Changes */}
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

export default EditJar;
