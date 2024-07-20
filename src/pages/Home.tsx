// Home.jsx
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {RegistrationTypeModal} from '../components/modals/RegistrationTypeModal.tsx';
import {useLoggedIn} from '../hooks/auth/useLoggedIn/useLoggedIn.ts';
import {ActivitiesList} from '../components/activities/ActivitiesList.tsx';
import {ActivitiesFilter} from '../components/activities/activitiesFilter/ActivitiesFilter.tsx';
// import {useAuthContext} from "../shared/hooks/useAuthContext.tsx";

export const Home = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const navigate = useNavigate();
  // const { isLoggedIn } = useAuthContext();
  const isLoggedIn = useLoggedIn();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRegisterClick = () => {
    if (!isLoggedIn) {
      onOpen();
    } else {
      navigate('/'); // or wherever you want logged-in users to go
    }
  };

  return (
    <Flex direction="column" minHeight="100vh" width="full">
      <Heading p={4} textAlign="center">Welcome to the Home Page</Heading>
      {isLoggedIn ? (
        <Flex flex="1" bg={bgColor} color={textColor} width="full">
          <VStack
            w="20%"
            p={4}
            borderRight="1px solid"
            borderColor={borderColor}
            alignItems="flex-start"
          >
            <Button w="full" variant="ghost">
              All Events
            </Button>
            <Button w="full" variant="ghost">
              My Events
            </Button>
            <Button w="full" variant="ghost">
              Organizations List
            </Button>
          </VStack>
          <VStack w="80%" p={4} spacing={4}>
            <ActivitiesFilter onApply={filters => console.log(filters)} />
            <VStack w="full" spacing={4}>
              <ActivitiesList />
            </VStack>
          </VStack>
        </Flex>
      ) : (
        <Flex flex="1" justifyContent="center" alignItems="center" p={4}>
          <Box textAlign="center">
            <Text mb={4}>You need to log in to see the events.</Text>
            <Button onClick={() => navigate('/login')} mr={4}>Login</Button>
            <Button onClick={handleRegisterClick}>Register</Button>
          </Box>
        </Flex>
      )}
      <RegistrationTypeModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
