import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Box, VStack, Alert, AlertIcon } from '@chakra-ui/react';
import { Activity } from '../api/types';
import ActivityInfo from '../components/activities/activityDetails/ActivityInfo.tsx';
import Details from '../components/activities/activityDetails/Details.tsx';
import Description from '../components/activities/activityDetails/Description.tsx';
import SimilarListings from '../components/activities/activityDetails/SimilarListings.tsx';

interface LocationState {
  activity: Activity;
}




const ActivityDetailsPage: React.FC = () => {
  const { state } = useLocation<LocationState>();
  const { activityId } = useParams<{ activityId: string }>();

  const activity = state?.activity;

  if (!activity) {
    return (
      <Alert status="error">
        <AlertIcon />
        Activity not found
      </Alert>
    );
  }

  return (
    <Box bg="gray.100" p={4}>
      <VStack spacing={8} align="stretch" maxW="1000px" mx="auto">
        <ActivityInfo activity={activity} />
        <Details activity={activity} />
        <Description description={activity.activityDescription} />
        <SimilarListings />
      </VStack>
    </Box>
  );
};

export default ActivityDetailsPage;