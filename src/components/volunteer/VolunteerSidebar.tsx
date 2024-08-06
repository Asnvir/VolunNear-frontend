import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button} from '@chakra-ui/react';

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
    if (location.pathname === '/all-events') {
      setActiveButton('allEvents');
    } else if (location.pathname === '/organizations-list') {
      setActiveButton('organizationsList');
    }
  }, [location.pathname]);

  return (
    <>
      <Button
        w="full"
        variant="ghost"
        {...buttonStyle('allEvents')}
        onClick={() => navigate('all-events')}
      >
        Events
      </Button>

      <Button
        w="full"
        variant="ghost"
        {...buttonStyle('organizationsList')}
        onClick={() => navigate('organizations-list')}
      >
        Organizations List
      </Button>
    </>
  );
};
