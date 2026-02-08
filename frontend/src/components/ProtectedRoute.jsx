import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem('token'); // simple token check
  if (!isLoggedIn) return <Navigate to="/login" />;
  return children;
}
