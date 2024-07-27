// Home.jsx
import {
  Button,
  Flex,
  Heading,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {RegistrationTypeModal} from '../components/modals/RegistrationTypeModal.tsx';
import {useLoggedIn} from '../hooks/auth/useLoggedIn/useLoggedIn.ts';
import {ActivitiesList} from '../components/activities/ActivitiesList.tsx';
import {ActivitiesFilter} from '../components/activities/activitiesFilter/ActivitiesFilter.tsx';
import Banner from '../components/home/Banner.tsx';
import DescriptionBoxes from '../components/home/DescriptionBoxes.tsx';
import AboutUs from '../components/home/AboutUs.tsx';
import JourneyOfVolunNearSection from '../components/home/JourneyVolunNearSection.tsx';
import Testimonials from '../components/home/Testimonials.tsx';
// import {useAuthContext} from "../shared/hooks/useAuthContext.tsx";

export const Home = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const navigate = useNavigate();
  // const { isLoggedIn } = useAuthContext();
  const isLoggedIn = useLoggedIn();
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <Flex direction="column" minHeight="100vh" width="full">
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
        <Flex direction="column" minHeight="100vh" width="full" >
          <Banner/>
          <DescriptionBoxes/>
          <AboutUs/>
          <JourneyOfVolunNearSection/>
          <Testimonials/>
        </Flex>
      )}
      <RegistrationTypeModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
