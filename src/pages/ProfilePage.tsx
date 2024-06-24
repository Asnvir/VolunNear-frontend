import {Box, Heading, Text} from "@chakra-ui/react";
import {useKeycloak} from "@react-keycloak/web";

export const ProfilePage = () => {
    const {keycloak} = useKeycloak();
    const {tokenParsed} = keycloak;

    return (
        <Box>
            <Heading>Profile Page</Heading>
            {tokenParsed && (
                <Box>
                    <Text>Email: {tokenParsed.email}</Text>
                    <Text>Username: {tokenParsed.preferred_username}</Text>
                    <Text>Name: {tokenParsed.name}</Text>
                </Box>
            )}
        </Box>
    );
};

