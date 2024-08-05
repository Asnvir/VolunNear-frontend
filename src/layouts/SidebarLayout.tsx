import {Outlet, useNavigate} from 'react-router-dom';
import {Button, Flex, useColorModeValue, VStack} from '@chakra-ui/react';
import useGetUserRole from '../hooks/auth/useGetUserRole/useGetUserRole.ts';
import {useState} from 'react';

export const SidebarLayout = () => {
  const navigate = useNavigate();
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  const userRole = useGetUserRole();
  const [activeButton, setActiveButton] = useState<string>('allEvents');

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
    <Flex width="full" height="100vh">
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
          onClick={() => handleButtonClick('allEvents', '/all-events')}
        >
          Events
        </Button>
        <Button
          w="full"
          variant="ghost"
          {...buttonStyle('organizationsList')}
          onClick={() =>
            handleButtonClick('organizationsList', '/organizations-list')
          }
        >
          Organizations List
        </Button>
      </VStack>
      <VStack w="80%" p={8} pt={0} spacing={4}>
        <Outlet /> {/* Content for each route will be rendered here */}
      </VStack>
    </Flex>
  );
};
