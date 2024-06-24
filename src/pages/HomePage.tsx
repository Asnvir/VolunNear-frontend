import {useKeycloak} from "@react-keycloak/web";
import { Box, Heading } from "@chakra-ui/react";


export const HomePage = () => {
    const { keycloak } = useKeycloak();
    console.log("Keycloak Instance:", keycloak);
    return (
        <Box>
            <Heading>Welcome to the Home Page</Heading>
        </Box>
    );
};

