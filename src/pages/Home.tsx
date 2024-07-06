// Home.jsx
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Input,
  SimpleGrid,
  VStack,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { EventCard } from '../components/EventCard';
import { useGetAllActivities } from '../hooks/useGetAllActivities';
import { useNavigate } from 'react-router-dom';
import { useLoggedIn } from '../hooks/useLoggedIn.ts';
import { RegistrationTypeModal } from "../components/modals/RegistrationTypeModal.tsx";


export const Home = () => {
  const { activities } = useGetAllActivities();
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const navigate = useNavigate();
  const loggedIn = useLoggedIn();
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log({ activities });
  console.log(loggedIn);

  const handleRegisterClick = () => {
    if (!loggedIn) {
      onOpen();
    } else {
      navigate('/'); // or wherever you want logged-in users to go
    }
  };

  return (
      <Box>
        <Heading>Welcome to the Home Page</Heading>
        {loggedIn ? (
            <Flex minH="100vh" bg={bgColor} color={textColor}>
              <VStack
                  w="20%"
                  p={4}
                  borderRight="1px solid"
                  borderColor={borderColor}
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
                <Box
                    w="full"
                    p={4}
                    border="1px solid"
                    borderColor="orange.400"
                    borderRadius="md"
                >
                  <SimpleGrid columns={6} spacing={4}>
                    <Input placeholder="Name" />
                    <Input placeholder="Date" />
                    <Input placeholder="Type" />
                    <Input placeholder="City" />
                    <Input placeholder="Country" />
                    <Input placeholder="Organization" />
                  </SimpleGrid>
                </Box>
                <VStack w="full" spacing={4}>
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                </VStack>
              </VStack>
            </Flex>
        ) : (
            <Box p={4}>
              <Text>You need to log in to see the events.</Text>
              <Button onClick={() => navigate('/login')}>Login</Button>
              <Button onClick={handleRegisterClick}>Register</Button>
            </Box>
        )}
        <RegistrationTypeModal isOpen={isOpen} onClose={onClose} />
      </Box>
  );
};
