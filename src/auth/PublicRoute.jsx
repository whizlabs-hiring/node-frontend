/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? children : <Navigate to="/" />;
};

export default PublicRoute;

