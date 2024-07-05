import {RouterProvider} from "react-router-dom";
import {router} from "./routes.tsx";
import {ChakraProvider} from '@chakra-ui/react'
import { ServiceProvider } from "./providers/ServiceProvider.tsx";

export const App = () => {
    return (
    <ServiceProvider>
            <ChakraProvider>
                    <RouterProvider router={router}/>
            </ChakraProvider>
        </ServiceProvider>
    );
}

