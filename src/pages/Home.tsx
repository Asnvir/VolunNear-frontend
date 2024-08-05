import {Button, Flex, useColorModeValue, VStack} from '@chakra-ui/react';
import {useLoggedIn} from '../hooks/auth/useLoggedIn/useLoggedIn.ts';
import Banner from '../components/home/Banner.tsx';
import DescriptionBoxes from '../components/home/DescriptionBoxes.tsx';
import AboutUs from '../components/home/AboutUs.tsx';
import JourneyOfVolunNearSection from '../components/home/JourneyVolunNearSection.tsx';
import Testimonials from '../components/home/Testimonials.tsx';
import {useState} from 'react';
import {ROLE_VOLUNTEER} from '../utils/constants/routes.ts';
import AddActivityForm from '../components/activities/addActivity/AddActivityForm.tsx';
import useGetUserRole from '../hooks/auth/useGetUserRole/useGetUserRole.ts';
import {AllEvents} from './AllEvents.tsx';
import {useNavigate} from 'react-router-dom';

export const Home = () => {
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const isLoggedIn = useLoggedIn();
  const userRole = useGetUserRole();
  const [activeButton, setActiveButton] = useState<string | null>(
    userRole === ROLE_VOLUNTEER ? 'allEvents' : 'addActivity'
  );
  const navigate = useNavigate();

  const handleButtonClick = (button: string, route: string) => {
    setActiveButton(button);
    navigate(route);
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
    <Flex
      direction="column"
      flex="1"
      alignItems="center"
      justifyContent="center"
      width="full"
    >
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
                  onClick={() => handleButtonClick('allEvents', 'all-events')}
                >
                  Events
                </Button>
                {/*<Button*/}
                {/*  w="full"*/}
                {/*  variant="ghost"*/}
                {/*  {...buttonStyle('myEvents')}*/}
                {/*  onClick={() => handleButtonClick('myEvents')}*/}
                {/*>*/}
                {/*  My Events*/}
                {/*</Button>*/}
                <Button
                  w="full"
                  variant="ghost"
                  {...buttonStyle('organizationsList')}
                  onClick={() =>
                    handleButtonClick('organizationsList', 'organizations-list')
                  }
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
                  onClick={() => handleButtonClick('addActivity', '')}
                >
                  Add Activity
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  {...buttonStyle('myActivities')}
                  onClick={() => handleButtonClick('myActivities', '')}
                >
                  My Activities
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  {...buttonStyle('chat')}
                  onClick={() => handleButtonClick('chat', '')}
                >
                  Chat
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  {...buttonStyle('notifications')}
                  onClick={() => handleButtonClick('notifications', '')}
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
              '::-webkit-scrollbar': {display: 'none'}, // This is a pseudo-element and remains in kebab-case
              msOverflowStyle: 'none', // Corrected from '-ms-overflow-style' to 'msOverflowStyle'
              scrollbarWidth: 'none', // Corrected from 'scrollbar-width' to 'scrollbarWidth'
            }}
          >
            {userRole === ROLE_VOLUNTEER ? (
              <AllEvents />
            ) : (
              <>{activeButton === 'addActivity' && <AddActivityForm />}</>
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
