import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import {
  SplashScreen, 
  WelcomeScreen, 
  Login, 
  Register, 
  Dashboard, 
  SavingsJarFormPage, 
  TransactionHistory, 
  AddTransaction, 
  EditJar
} from './components/index';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/SavingsJarForm" element={<SavingsJarFormPage />} />
        <Route path="/transactions/:userId/:jarId" element={<TransactionHistory />} />
        <Route path="/AddTransaction/:userId/:jarId" element={<AddTransaction />} /> 
        <Route path="/editJar/:userId/:jarId" element={<EditJar />} />
      </Routes>
    </Router>
  );
};

export default App;
