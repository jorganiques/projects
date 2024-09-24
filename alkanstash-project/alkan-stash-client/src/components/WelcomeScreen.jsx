import { Link } from 'react-router-dom';
import Button from './Button';

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-6">Welcome to AlkanStash</h2>
        <div className="space-y-4">
          <Link to="/login" className="block w-full">
            <Button className="bg-blue-500 text-white focus:ring-blue-500">Login to AlkanStash</Button>
          </Link>
          <Link to="/register" className="block w-full">
            <Button className="bg-green-500 text-white focus:ring-green-500">Create Account</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
