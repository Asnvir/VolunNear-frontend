import {RouterProvider} from "react-router-dom";
import {router} from "./routes.tsx";
import {ChakraProvider} from '@chakra-ui/react'
import { ServiceProvider } from "./providers/ServiceProvider.tsx";
import {AuthProvider} from "./providers/AuthProvider.tsx";

export const App = () => {
    return (
    <ServiceProvider>
            <ChakraProvider>
                <AuthProvider>
                    <RouterProvider router={router}/>
                </AuthProvider>
            </ChakraProvider>
        </ServiceProvider>
    );
}

