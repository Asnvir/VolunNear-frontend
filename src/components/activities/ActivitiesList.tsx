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
  const {activities, isLoading, error, refetch} = useGetActivities();
  const areActivitiesAvailable = !!(activities && activities.length > 0);

  if (isLoading) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <VStack spacing={4} width="100%">
      <Button onClick={() => refetch()} colorScheme="teal">
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
