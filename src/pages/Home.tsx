// Home.jsx
import {
  Box,
  Button,
  Flex,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
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
import {ROLE_VOLUNTEER} from '../utils/constants/routes.ts';
import AddActivityForm from '../components/activities/addActivity/AddActivityForm.tsx';
import useGetUserRole from '../hooks/auth/useGetUserRole/useGetUserRole.ts';

export const Home = () => {
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const isLoggedIn = useLoggedIn();
  const [filters, setFilters] = useState<ActivitiesFiltersType>(emptyFilters);
  const userRole = useGetUserRole();
  const [activeButton, setActiveButton] = useState<string | null>(userRole === ROLE_VOLUNTEER ? 'allEvents' : 'addActivity');


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
    <Flex direction="column" flex="1" alignItems="center" justifyContent="center" width="full">
      {isLoggedIn ? (
        <Flex flex="1" color={textColor} width="full" height="100vh">
          <VStack
            w="20%"
            p={4}
            borderRight="1px solid"
            borderColor={borderColor}
            alignItems="flex-start"
          >
            {userRole === ROLE_VOLUNTEER ? (
              <>
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
              </>
            ) : (
              <>
                <Button
                  w="full"
                  variant="ghost"
                  {...buttonStyle('addActivity')}
                  onClick={() => handleButtonClick('addActivity')}
                >
                  Add Activity
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  {...buttonStyle('myActivities')}
                  onClick={() => handleButtonClick('myActivities')}
                >
                  My Activities
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  {...buttonStyle('chat')}
                  onClick={() => handleButtonClick('chat')}
                >
                  Chat
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  {...buttonStyle('notifications')}
                  onClick={() => handleButtonClick('notifications')}
                >
                  Notifications
                </Button>
              </>
            )}
          </VStack>
          <VStack
            w="80%"
            p={8}
            pt={0}
            spacing={4}
            maxHeight="calc(100vh - 220px)"
            overflowY="auto"
            sx={{
              '::-webkit-scrollbar': { display: 'none' },
              '-ms-overflow-style': 'none',
              'scrollbar-width': 'none',
            }}
          >
            {userRole === ROLE_VOLUNTEER ? (
              <>
                <ActivitiesFilter onApply={handleFiltersChange} />
                <Box w="full">
                  <ActivitiesMapComponent isMyActivities={false} filters={filters} />
                </Box>
                <ActivitiesList isMyActivities={false} filters={filters} />
              </>
            ) : (
              <>
                { activeButton === 'addActivity' && (
              <AddActivityForm/>
                  )}
              </>
            )}
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