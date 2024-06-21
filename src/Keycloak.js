import Keycloak from "keycloak-js";

// VITE_KC_URL="http://localhost:8083/auth"
// VITE_KC_REALM="VolunNearRealm"
// VITE_KC_CLIENT_ID="VolunNearClient"

const keycloak = new Keycloak({
    url: 'http://localhost:8083/',
    realm: 'VolunNearRealm',
    clientId: 'VolunNearClient',
});

export default keycloak;