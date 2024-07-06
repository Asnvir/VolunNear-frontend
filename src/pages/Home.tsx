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
  useDisclosure,
  Center,
  Container
} from '@chakra-ui/react';
import { EventCard } from '../components/EventCard';
import { useGetAllActivities } from '../hooks/useGetAllActivities';
import { useNavigate } from 'react-router-dom';
import { useLoggedIn } from '../hooks/useLoggedIn.ts';
import { RegistrationTypeModal } from '../components/modals/RegistrationTypeModal.tsx';

export const Home = () => {
  const { activities } = useGetAllActivities();
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const navigate = useNavigate();
  const loggedIn = useLoggedIn();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRegisterClick = () => {
    if (!loggedIn) {
      onOpen();
    } else {
      navigate('/'); // or wherever you want logged-in users to go
    }
  };

  return (
      <Box minH="100vh" bg={bgColor} color={textColor} p={4}>
        <Container maxW="container.xl">
          <Heading mb={6} textAlign="center">Welcome to the Home Page</Heading>
          {loggedIn ? (
              <Flex>
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
                  <Box
                      w="full"
                      p={4}
                      border="1px solid"
                      borderColor="orange.400"
                      borderRadius="md"
                      mb={4}
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
                    {activities.map((activity, index) => (
                        <EventCard key={index} activity={activity} />
                    ))}
                  </VStack>
                </VStack>
              </Flex>
          ) : (
              <Center flexDirection="column">
                <Text mb={4}>You need to log in to see the events.</Text>
                <Button colorScheme="teal" mb={2} onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button colorScheme="teal" onClick={handleRegisterClick}>
                  Register
                </Button>
              </Center>
          )}
          <RegistrationTypeModal isOpen={isOpen} onClose={onClose} />
        </Container>
      </Box>
  );
};
