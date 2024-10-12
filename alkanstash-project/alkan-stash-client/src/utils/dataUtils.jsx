import axios from 'axios';
export const getUserDataFromLocalStorage = () => {
    return {
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username')
    };
  };
  
  export const setUserDataToLocalStorage = (userId, username) => {
    console.log('setUserDataToLocalStorage called with:', userId, username); 
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);
  };
  
  
  export const fetchUserJars = async (userId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jars/${userId}`);
      return response.data.filter(jar => !jar.isDeleted); // Filter non-deleted jars
    } catch (error) {
      throw new Error('Failed to fetch jars.');
    }
  };
  
  export const fetchUserTransactions = async (userId, jarId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/transactions/${userId}/${jarId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch transactions.');
    }
  };
  