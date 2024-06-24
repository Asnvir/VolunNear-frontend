import { ReactNode } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: ReactNode;
    roles: string[];
}

export const PrivateRoute = ({ children, roles }: PrivateRouteProps) => {
    const { keycloak } = useKeycloak();

    const isAuthorized = roles.some(role => keycloak?.hasRealmRole(role));

    return isAuthorized ? <>{children}</> : <Navigate to="/" />;
};
