import {Alert, AlertIcon, Box, Spinner, Text, VStack} from '@chakra-ui/react';
import {ActivityCard} from '../ActivityCard.tsx';
import {useGetActivities} from '../../../hooks/activities/useGetActivities/useGetActivities.ts';
import {ActivitiesListProps} from './types.ts';
import {useNavigate} from 'react-router-dom';
import {Activity} from '../../../api/types.ts';

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
  } = useGetActivities({isMyActivities, filters});

  const navigate = useNavigate();

  const areActivitiesAvailable = !!(activities && activities.length > 0);

  const handleActivityClick = (activity: Activity) => {
    navigate(`/activity/${activity.activityId}`, {state: {activity}});
  }

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
      <Heading as="h2" size="lg" mb="4">All Activities</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
        {areActivitiesAvailable ? (
          activities.map((activity,index) => (
            <ActivityCard key={index} activity={activity} onClick={handleActivityClick} />
          ))
        ) : (
          <Box>No activities found</Box>
        )}
      </SimpleGrid>
    </Box>
  );
};
