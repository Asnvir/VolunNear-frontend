import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import {useAuthContext} from "../shared/hooks/useAuthContext.tsx";

interface PrivateRouteProps {
    children: ReactNode;
    roles: string[];
}

export const PrivateRoute = ({ children, roles }: PrivateRouteProps) => {
    const authContext = useAuthContext();
    const {user} = authContext;

    const isAuthorized = roles.some(role => user?.role === role);

    return isAuthorized ? <>{children}</> : <Navigate to="/" />;
};
