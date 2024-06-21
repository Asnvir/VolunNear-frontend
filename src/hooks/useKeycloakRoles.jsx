import { useKeycloak } from '@react-keycloak/web';

const useKeycloakRoles = () => {
    const { keycloak } = useKeycloak();

    if (keycloak && keycloak.tokenParsed) {
        const realmRoles = keycloak.tokenParsed.realm_access?.roles || [];
        const resourceRoles = keycloak.tokenParsed.resource_access
            ? Object.values(keycloak.tokenParsed.resource_access).flatMap(access => access.roles)
            : [];

        console.log('Realm Roles:', realmRoles);
        console.log('Resource Roles:', resourceRoles);

        return {
            realmRoles,
            resourceRoles,
        };
    }

    return {
        realmRoles: [],
        resourceRoles: [],
    };
};

export default useKeycloakRoles;
