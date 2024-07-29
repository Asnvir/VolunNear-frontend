import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLoggedIn } from '../../hooks/auth/useLoggedIn/useLoggedIn.ts';

const ProtectedRoute: React.FC = ({ children }) => {
  const isLoggedIn = useLoggedIn();

  if (!isLoggedIn) {
    // Redirect to login page if the user is not authenticated
    return <Navigate to="/login"/>;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;