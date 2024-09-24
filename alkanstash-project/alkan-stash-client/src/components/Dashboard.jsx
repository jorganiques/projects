import { useNavigate, useLocation } from 'react-router-dom';
import JarList from './JarList';
import { useState, useEffect } from 'react';
import { getUserDataFromLocalStorage } from '../utils/dataUtils';  
import backgroundImage from '../assets/dashboard.jpg';

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { username, userId } = getUserDataFromLocalStorage();  
  const navigate = useNavigate();

  const handleJarDeleted = () => {
    setRefreshKey(prevKey => prevKey + 1); 
  };

  console.log(userId);  

  return (
    <div 
      className="container mx-auto p-4 min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col items-center sm:flex-row sm:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
          {username ? `${username}'s Savings Jars` : 'Your Savings Jars'}
        </h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate('/SavingsJarForm')} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Create New Jar
          </button>
          <button 
            onClick={() => navigate('/welcome')} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
      <JarList key={refreshKey} onJarDeleted={handleJarDeleted} userId={userId} />
    </div>
  );
};

export default Dashboard;
