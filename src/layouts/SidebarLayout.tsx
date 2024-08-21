import {Outlet} from 'react-router-dom';
import useGetUserRole from '../hooks/auth/useGetUserRole/useGetUserRole.ts';
import {
  ROLE_ORGANISATION,
  ROLE_VOLUNTEER,
} from '../utils/constants/authConstants.ts';
import Banner from '../components/home/Banner.tsx';
import DescriptionBoxes from '../components/home/DescriptionBoxes.tsx';
import AboutUs from '../components/home/AboutUs.tsx';
import JourneyOfVolunNearSection from '../components/home/JourneyVolunNearSection.tsx';
import Testimonials from '../components/home/Testimonials.tsx';
import {useLoggedIn} from '../hooks/auth/useLoggedIn/useLoggedIn.ts';
import {Flex, useColorModeValue, VStack} from '@chakra-ui/react';
import {VolunteerSidebar} from '../components/volunteer/VolunteerSidebar.tsx';
import {OrganizationSidebar} from '../components/organizations/OrganizationSidebar.tsx';

export const SidebarLayout = () => {
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const isLoggedIn = useLoggedIn();
  const userRole = useGetUserRole();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
    }
  };

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
              <VolunteerSidebar />
            ) : userRole === ROLE_ORGANISATION ? (
              <OrganizationSidebar />
            ) : (
              <></>
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
              '::-webkit-scrollbar': {display: 'none'},
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            <Outlet />
          </VStack>
        </Flex>
      ) : (
        <Flex direction="column" minHeight="100vh" width="full">
          <Banner />
          <DescriptionBoxes />
          <AboutUs id="about-us" />
          <JourneyOfVolunNearSection />
          <Testimonials id="feedbacks" />
        </Flex>
      )}
    </Flex>
  );
};
