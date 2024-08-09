import {ReactNode} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useLoggedIn} from '../../hooks/auth/useLoggedIn/useLoggedIn.ts';
import useGetUserRole from '../../hooks/auth/useGetUserRole/useGetUserRole.ts';

type ProtectedRouteProps = {
  roles?: string[]; // Array of roles that are allowed to access the route
  children?: ReactNode; // Optional children prop of type ReactNode
};

export const ProtectedRoute = ({roles = [], children}: ProtectedRouteProps) => {
  const isLoggedIn = useLoggedIn();
  const userRole = useGetUserRole();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to login page if the user is not authenticated
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  if (roles.length > 0 && !roles.includes(userRole)) {
    // Redirect to an unauthorized page or homepage if the user does not have the required role
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};
