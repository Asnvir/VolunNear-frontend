import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button} from '@chakra-ui/react';
import {
  ROUTE_ORGANIZATION_ADD_ACTIVITY,
  ROUTE_ORGANIZATION_MY_ACTIVITIES,
} from '../../utils/constants/routesConstants.ts';

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
    if (location.pathname === ROUTE_ORGANIZATION_ADD_ACTIVITY) {
      setActiveButton('addActivity');
    } else if (location.pathname === ROUTE_ORGANIZATION_MY_ACTIVITIES) {
      setActiveButton('myActivities');
    } else if (location.pathname === '/chat') {
      setActiveButton('chat');
    } else if (location.pathname === '/notifications') {
      setActiveButton('notifications');
    }
  }, [location.pathname]);

  return (
    <>
      <Button
        w="full"
        variant="ghost"
        {...buttonStyle('addActivity')}
        onClick={() => navigate(ROUTE_ORGANIZATION_ADD_ACTIVITY)}
      >
        Add event
      </Button>
      <Button
        w="full"
        variant="ghost"
        {...buttonStyle('myActivities')}
        onClick={() => navigate(ROUTE_ORGANIZATION_MY_ACTIVITIES)}
      >
        My events
      </Button>
      <Button
        w="full"
        variant="ghost"
        {...buttonStyle('chat')}
        onClick={() => navigate('chats')}
      >
        Chat
      </Button>
      <Button
        w="full"
        variant="ghost"
        {...buttonStyle('notifications')}
        onClick={() => navigate('notifications')}
      >
        Notifications
      </Button>
    </>
  );
};
