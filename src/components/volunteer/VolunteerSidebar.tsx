import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button} from '@chakra-ui/react';
import {
  ROUTE_VOLUNTEER_EVENTS,
  ROUTE_VOLUNTEER_ORGANIZATIONS,
} from '../../utils/constants/routesConstants.ts';

export const VolunteerSidebar = () => {
  const [activeButton, setActiveButton] = useState<string | null>();
  const location = useLocation();
  const navigate = useNavigate();

  const buttonStyle = (button: string) => ({
    bg: activeButton === button ? '#FF7A00' : 'transparent',
    opacity: activeButton === button ? 1 : 0.5,
    color: activeButton === button ? 'white' : 'black',
    _hover: {
      bg: 'orange.300',
      color: 'white',
    },
  });

  useEffect(() => {
    if (location.pathname === ROUTE_VOLUNTEER_EVENTS) {
      setActiveButton('allEvents');
    } else if (location.pathname === ROUTE_VOLUNTEER_ORGANIZATIONS) {
      setActiveButton('organizationsList');
    }
  }, [location.pathname]);

  return (
    <>
      <Button
        w="full"
        variant="ghost"
        {...buttonStyle('allEvents')}
        onClick={() => navigate(ROUTE_VOLUNTEER_EVENTS)}
      >
        Events
      </Button>

      <Button
        w="full"
        variant="ghost"
        {...buttonStyle('organizationsList')}
        onClick={() => navigate(ROUTE_VOLUNTEER_ORGANIZATIONS)}
      >
        Organizations
      </Button>
    </>
  );
};
