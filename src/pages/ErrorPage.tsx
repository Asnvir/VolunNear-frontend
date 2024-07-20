import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.50"
      p={4}
    >
      <VStack spacing={6} textAlign="center">
        <Heading as="h1" size="2xl">
          404
        </Heading>
        <Text fontSize="xl">Oops! The page you are looking for does not exist.</Text>
        <Button colorScheme="blue" onClick={() => navigate('/')}>
          Go Home
        </Button>
      </VStack>
    </Box>
  );
};

export default ErrorPage;
