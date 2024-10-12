import { useState, useEffect } from 'react';
import axios from 'axios';
import JarCard from './JarCard';

const JarList = ({ onJarDeleted }) => {
  const [jars, setJars] = useState([]);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('userId')); // Fetch userId from localStorage
  const username = localStorage.getItem('username'); // Fetch username from localStorage

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user/${username}`);
        const user = response.data;

        if (user && user.userId) {
          setUserId(user.userId);
          localStorage.setItem('userId', user.userId);
        } else {
          setError('User ID not found.');
        }
      } catch (err) {
        setError('Failed to fetch user details.');
      }
    };

    const fetchJars = async () => {
      if (!userId) {
        setError('User ID not found.');
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jars/${userId}`);
        const filteredJars = response.data.filter(jar => !jar.isDeleted);
        setJars(filteredJars);
        setError(filteredJars.length === 0 ? 'No jars found.' : '');
      } catch (err) {
        setError('Failed to fetch jars.');
      }
    };

    fetchUserId().then(fetchJars);
  }, [userId, username, onJarDeleted]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {error && <p className="text-red-500">{error}</p>}
      {jars.length > 0 ? (
        jars.map(jar => <JarCard key={jar.jarId} jar={jar} onJarDeleted={onJarDeleted} />) // Use jarId as key
      ) : (
        !error && <p>No jars found.</p> // Only show if there's no error
      )}
    </div>
  );
};

export default JarList;
