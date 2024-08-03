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
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const isLoggedIn = useLoggedIn();
  const [filters, setFilters] = useState<ActivitiesFiltersType>(emptyFilters);
  const [activeButton, setActiveButton] = useState<string | null>('allEvents');


  const handleFiltersChange = (filters: ActivitiesFiltersType) => {
    console.log(`Filters changed:\n ${JSON.stringify(filters)}`);
    setFilters(filters);
  };

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };


  const buttonStyle = (button: string) => ({
    bg: activeButton === button ? '#FF7A00' : 'transparent',
    opacity: activeButton === button ? 1 : 0.5,
    color: activeButton === button ? 'white' : 'black',
    _hover: {
      bg: 'orange.300',
      color: 'white',
    },
  });

  return (
    <Flex direction="column" minHeight="100vh" width="full">
      {isLoggedIn ? (
        <Flex flex="1" color={textColor} width="full" px={8}>

          <VStack
            w="20%"
            p={4}
            borderRight="1px solid"
            borderColor={borderColor}
            alignItems="flex-start"
          >
            <Button
              w="full"
              variant="ghost"
              {...buttonStyle('allEvents')}
              onClick={() => handleButtonClick('allEvents')}
            >
              All Events
            </Button>
            <Button
              w="full"
              variant="ghost"
              {...buttonStyle('myEvents')}
              onClick={() => handleButtonClick('myEvents')}
            >
              My Events
            </Button>
            <Button
              w="full"
              variant="ghost"
              {...buttonStyle('organizationsList')}
              onClick={() => handleButtonClick('organizationsList')}
            >
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
    </Flex>
  );
};
