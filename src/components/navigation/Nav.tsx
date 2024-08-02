import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure, Avatar, MenuButton, Menu, MenuList, MenuItem, MenuDivider,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
} from '@chakra-ui/icons'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import {useNavigate} from 'react-router-dom';
import {useLoggedIn} from '../../hooks/auth/useLoggedIn/useLoggedIn.ts';
import {useLoggedOut} from '../../hooks/auth/useLoggedOut/useLoggedOut.ts';
import {useGetVolunteerProfile} from '../../hooks/volunteer/useGetVolunteerProfile/useGetVolunteerProfile.ts';
import {useEffect, useState} from 'react';

const Nav = () => {
  const { isOpen, onToggle } = useDisclosure()
  const navigate = useNavigate();
  const isLoggedIn = useLoggedIn();
  const logout = useLoggedOut();

  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const {data, refetch} = useGetVolunteerProfile();

  useEffect(() => {
    if (isLoggedIn) {
      refetch().then((result) => {
        if (result.data && result.data.avatarUrl) {
          setAvatarUrl(result.data.avatarUrl);
        }
      });
    }
  }, [isLoggedIn, refetch]);

  const handleLogout = () => {
    logout().then(() => navigate("/login"));
  }

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            align={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            Volun <Box as="span" color="gray.500">Near</Box>
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction='row'
          spacing={6}>
          {isLoggedIn ? (
              <Flex alignItems={'center'}>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar
                      size={'md'}
                      src={
                       avatarUrl
                      }
                    />
                  </MenuButton>
                  <MenuList zIndex={10000000}>
                    <MenuItem onClick={() =>navigate("/volunteer/profile")}>Profile</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
          ) :
            <Button variant="primary" onClick={() => navigate("/login")}>
              Sign In
            </Button>
          }

        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

export default Nav;
