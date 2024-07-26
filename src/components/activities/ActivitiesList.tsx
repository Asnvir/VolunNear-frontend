import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import {ActivityCard} from './ActivityCard.tsx';
import {useGetActivities} from '../../hooks/activities/useGetActivities/useGetActivities.ts';

export const ActivitiesList = () => {
  const {
    data: activities,
    isLoading: isLoadingActivities,
    error: errorActivities,
    refetch: refetchActivities,
    isGeolocationAvailable,
    isGeolocationEnabled,
    positionError,
  } = useGetActivities();

  const areActivitiesAvailable = !!(activities && activities.length > 0);

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
    <VStack spacing={4} width="100%">
      <Button onClick={() => refetchActivities()} colorScheme="teal">
        Reload Activities
      </Button>
      {areActivitiesAvailable ? (
        activities.map(activity => (
          <ActivityCard key={activity.activityId} activity={activity} />
        ))
      ) : (
        <Box>No activities found</Box>
      )}
    </VStack>
  );
};
