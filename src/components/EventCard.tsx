import {Box, HStack, Text} from "@chakra-ui/react";

export const EventCard = () => (
    <Box w="full" p={4} border="1px solid blue" borderRadius="md">
        <HStack justifyContent="space-between" mb={2}>
            <Text>Event Name</Text>
            <Text>Organization</Text>
        </HStack>
        <HStack justifyContent="space-between">
            <Text>Description</Text>
            <Text>City</Text>
            <Text>Country</Text>
        </HStack>
    </Box>
);