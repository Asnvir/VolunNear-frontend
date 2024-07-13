import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import {useGetAllActivities} from '../hooks/useGetAllActivities.ts';
import {ActivityCard} from './ActivityCard.tsx';

export const ActivitiesList = () => {
  const {activities, isLoading, error, refetch} = useGetAllActivities();

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
        Refetch Activities
      </Button>
      {activities && activities.length > 0 ? (
        activities.map(activity => (
          <ActivityCard key={activity.activityId} activity={activity} />
        ))
      ) : (
        <Box>No activities found</Box>
      )}
    </VStack>
  );
};
