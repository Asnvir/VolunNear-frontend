import {Button, Flex, Heading, Text, VStack} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Flex direction="column" flex="1" alignItems="center" justifyContent="center" width="full">
      <VStack spacing={6} textAlign="center">
        <Heading as="h1" size="2xl">
          404
        </Heading>
        <Text fontSize="xl">Oops! The page you are looking for does not exist.</Text>
        <Button variant="primary" onClick={() => navigate('/')}>
          Go Home
        </Button>
      </VStack>
    </Flex>
  );
};

export default ErrorPage;
