import React, {ReactNode} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useLoggedIn} from '../../hooks/auth/useLoggedIn/useLoggedIn.ts';

type ProtectedRouteProps = {
  children?: ReactNode; // Optional children prop of type ReactNode
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const isLoggedIn = useLoggedIn();

  if (!isLoggedIn) {
    // Redirect to login page if the user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace  />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
