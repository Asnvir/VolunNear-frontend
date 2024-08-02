// Home.jsx
import {
  Button,
  Flex,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {RegistrationTypeModal} from '../components/modals/RegistrationTypeModal.tsx';
import {useLoggedIn} from '../hooks/auth/useLoggedIn/useLoggedIn.ts';
import {ActivitiesList} from '../components/activities/list/ActivitiesList.tsx';
import {ActivitiesFilter} from '../components/activities/filter/ActivitiesFilter.tsx';
import Banner from '../components/home/Banner.tsx';
import DescriptionBoxes from '../components/home/DescriptionBoxes.tsx';
import AboutUs from '../components/home/AboutUs.tsx';
import JourneyOfVolunNearSection from '../components/home/JourneyVolunNearSection.tsx';
import Testimonials from '../components/home/Testimonials.tsx';
import {ActivitiesMapComponent} from '../components/activities/map/ActivitiesMapComponent.tsx';
import {ActivitiesFiltersType} from '../api/services/activities/service/types.ts';
import {useState} from 'react';
import {emptyFilters} from '../hooks/activities/useActivitiesFilterForm/useActivitiesFilterForm.tsx';

export const Home = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const navigate = useNavigate();
  const isLoggedIn = useLoggedIn();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [filters, setFilters] = useState<ActivitiesFiltersType>(emptyFilters);

  const cards = [
    // {
    //   name: 'Location 1',
    //   description: 'Description 1',
    //   latitude: 51.505,
    //   longitude: -0.09,
    // },
    // {
    //   name: 'Location 2',
    //   description: 'Description 2',
    //   latitude: 51.515,
    //   longitude: -0.1,
    // },
    {
      name: 'Location 3',
      description: 'Description 3',
      latitude: 32.324898,
      longitude: 34.855155,
    },
  ];

  const handleFiltersChange = (filters: ActivitiesFiltersType) => {
    console.log(`Filters changed:\n ${JSON.stringify(filters)}`);
    setFilters(filters);
  };

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
            <ActivitiesFilter onApply={handleFiltersChange} />
            <ActivitiesMapComponent isMyActivities={false} filters={filters} />
            <ActivitiesList isMyActivities={false} filters={filters} />
          </VStack>
        </Flex>
      ) : (
        <Flex direction="column" minHeight="100vh" width="full">
          <Banner />
          <DescriptionBoxes />
          <AboutUs />
          <JourneyOfVolunNearSection />
          <Testimonials />
        </Flex>
      )}
      <RegistrationTypeModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
