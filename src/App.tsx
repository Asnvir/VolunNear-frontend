import {ReactKeycloakProvider} from "@react-keycloak/web";
import {keycloak} from "./Keycloak";
import {RouterProvider} from "react-router-dom";
import router from "./routes.tsx";
import {ChakraProvider} from '@chakra-ui/react'

export const App = () => {
    return (
        <ChakraProvider>
            <ReactKeycloakProvider authClient={keycloak}>
                <RouterProvider router={router}/>
            </ReactKeycloakProvider>
        </ChakraProvider>
    );
}

