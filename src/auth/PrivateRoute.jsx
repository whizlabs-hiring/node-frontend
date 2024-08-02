/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
