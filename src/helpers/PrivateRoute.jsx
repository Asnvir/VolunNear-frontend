import { Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

export function PrivateRoute({ children, roles }) {
    const { keycloak } = useKeycloak();

    // Check if the user is authorized
    const isAuthorized = !roles || roles.some(role => {
        return keycloak.hasRealmRole(role) || keycloak.hasResourceRole(role)
    })
    ;

    return isAuthorized ? children : <Navigate to="/" />;

}
