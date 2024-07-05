import {Box, Flex, Text} from "@chakra-ui/react";

export const Footer = () => {
    return (
        <Flex as="footer" bg="gray.800" color="white" p={4} justify="center">
            <Box>
                <Text>© 2024 VolunNear. All rights reserved.</Text>
            </Box>
        </Flex>
    );
};

