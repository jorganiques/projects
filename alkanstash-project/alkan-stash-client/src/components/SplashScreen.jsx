import { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import loadingGif from '../assets/loading-gif.gif';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to AlkanStash</h1>
        <img src={loadingGif} alt="Loading..." className="mx-auto mb-4" />
        <p className="text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default SplashScreen;
