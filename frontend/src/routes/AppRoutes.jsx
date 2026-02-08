import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import PasswordReset from '../components/Auth/PasswordReset';
import MainDashboard from '../components/Dashboard/MainDashboard';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/" element={<PrivateRoute><MainDashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}
