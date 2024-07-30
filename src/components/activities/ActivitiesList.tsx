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
import {useNavigate} from 'react-router-dom';
import {Activity} from '../../api/types.ts';

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
    <VStack spacing={4} width="100%">
      <Button onClick={() => refetchActivities()} colorScheme="teal">
        Reload Activities
      </Button>
      {areActivitiesAvailable ? (
        activities.map(activity => (
          <ActivityCard key={activity.activityId} activity={activity} onClick={handleActivityClick} />
        ))
      ) : (
        <Box>No activities found</Box>
      )}
    </VStack>
  );
};
