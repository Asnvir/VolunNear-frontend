import {ReactKeycloakProvider, useKeycloak} from "@react-keycloak/web";
import {ReactNode, useEffect, useState} from "react";
import Keycloak from "keycloak-js";
import { iLocalStorageHelper } from "../helpers/types";
import { LocalStorageHelper } from "../helpers/LocalStorageHelper";
import { AUTH_TOKEN } from "../utils/constants";

export type AuthProviderProps = {
    children: ReactNode;
}

const localStorageHelper: iLocalStorageHelper = new LocalStorageHelper();

const InternalAuthProvider = ({children}: AuthProviderProps) => {
    const {keycloak} = useKeycloak();

    useEffect(() => {
        console.log("Keycloak token", keycloak.token);
        localStorageHelper.setItem(AUTH_TOKEN, keycloak.token || "")
        
        return () => {
            localStorageHelper.removeItem(AUTH_TOKEN);
            console.log("Keycloak token removed");
        }
    }, [keycloak.token]);

    return (
        <>
            {children}
        </>
    );
}

export const AuthProvider = ({children}: AuthProviderProps) => {

    const [keycloak] = useState(new Keycloak({
            url: import.meta.env.VITE_KC_URL,
            realm: import.meta.env.VITE_KC_REALM,
            clientId: import.meta.env.VITE_KC_CLIENT_ID,
        })
    );

    return (
        <ReactKeycloakProvider authClient={keycloak}>
            <InternalAuthProvider>
                {children}
            </InternalAuthProvider>
        </ReactKeycloakProvider>
    );
}
