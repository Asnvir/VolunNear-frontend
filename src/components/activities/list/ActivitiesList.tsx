import React, { useState } from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  Flex,
} from '@chakra-ui/react';
import { ActivityCard } from '../ActivityCard.tsx';
import { useGetActivities } from '../../../hooks/activities/useGetActivities/useGetActivities.ts';
import { ActivitiesListProps } from './types.ts';
import { useNavigate } from 'react-router-dom';
import { Activity } from '../../../api/types.ts';

export const ActivitiesList = ({
                                 isMyActivities,
                                 filters,
                               }: ActivitiesListProps) => {
  const {
    data: activities,
    isLoading: isLoadingActivities,
    error: errorActivities,
    isGeolocationAvailable,
    isGeolocationEnabled,
    positionError,
  } = useGetActivities({ isMyActivities, filters });

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const areActivitiesAvailable = !!(activities && activities.length > 0);

  const handleActivityClick = (activity: Activity) => {
    navigate(`/activity/${activity.activityId}`, { state: { activity } });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = activities ? activities.slice(startIndex, endIndex) : [];

  const totalPages = activities ? Math.ceil(activities.length / itemsPerPage) : 0;

  if (!isGeolocationAvailable) {
    return (
      <Box textAlign="center" mt="20">
        <Text>Your browser does not support Geolocation</Text>
      </Box>
    );
  }

  if (!isGeolocationEnabled) {
    return (
      <Box textAlign="center" mt="20">
        {positionError && (
          <Alert status="error" mt="4">
            <AlertIcon />
            {positionError.message}
          </Alert>
        )}
      </Box>
    );
  }

  if (isLoadingActivities) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (errorActivities) {
    return (
      <Alert status="error">
        <AlertIcon />
        {errorActivities}
      </Alert>
    );
  }

  return (
    <Box p={4}>
      {areActivitiesAvailable && (
        <>
          <Heading as="h2" size="lg" mb="4">
            All Activities
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {currentActivities.map((activity, index) => (
              <ActivityCard key={index} activity={activity} onClick={handleActivityClick} />
            ))}
          </SimpleGrid>
          <Flex justify="center" mt={4}>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                mx={1}
                onClick={() => handlePageChange(i + 1)}
                bg={currentPage === i + 1 ? '#FF7A00' : 'gray.200'}
                color={currentPage === i + 1 ? 'white' : 'black'}
                _hover={{ bg: currentPage === i + 1 ? '#FF7A00' : 'gray.300' }}
              >
                {i + 1}
              </Button>
            ))}
          </Flex>
        </>
      )}
    </Box>
  );
};
