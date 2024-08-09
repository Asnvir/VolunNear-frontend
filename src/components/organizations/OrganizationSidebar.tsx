import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button} from '@chakra-ui/react';

export const OrganizationSidebar = () => {
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
    if (location.pathname === '/add-activity') {
      setActiveButton('addActivity');
    } else if (location.pathname === '/my-activities') {
      setActiveButton('myActivities');
    }
  }, [location.pathname]);

  return (
    <>
      <Button
        w="full"
        variant="ghost"
        {...buttonStyle('addActivity')}
        onClick={() => navigate('add-activity')}
      >
        Add Activity
      </Button>
      <Button
        w="full"
        variant="ghost"
        {...buttonStyle('myActivities')}
        onClick={() => navigate('my-activities')}
      >
        My Activities
      </Button>
    </>
  );
};
