import React from 'react';
import {useLocation} from 'react-router-dom';
import {Alert, AlertIcon, Box, Flex, Text, useToast} from '@chakra-ui/react';
import {Activity} from '../api/types';
import {useGetAverageRating} from '../hooks/organizations/useGetAvarageRating/useGetAverageRating.ts';
import {useGetVolunteerActivities} from '../hooks/activities/useGetVolunteerActivities/useGetVolunteerActivities.ts';
import {useGetFeedbacksByOrganisation} from '../hooks/feedbacks/useGetFeedbacksByOrganisation/useGetFeedbacksByOrganisation.ts';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CustomImageGallery from '../components/activities/activityDetails/ImageGallery.tsx';
import SimilarListings from '../components/activities/activityDetails/SimilarListings.tsx';
import {useVolunteerActivityJoined} from '../hooks/volunteer/useVolunteerActivityJoined/useVolunteerActivityJoined.ts';
import {useJoinToActivity} from '../hooks/activities/useJoinToActivity/useJoinToActivity.ts';
import {useLeaveActivity} from '../hooks/activities/useLeaveActivity/useLeaveActivity.ts';
import {BIG_NUMBER_FOR_PAGINATION} from '../utils/constants/defaultActivitiesPagingValues.ts';
import {ActivityInfo} from '../components/activities/activityDetails/ActivityInfo.tsx';
import {Rating} from '../components/activities/activityDetails/Rating.tsx';
import {FeedbackCount} from '../components/activities/activityDetails/FeedbackCount.tsx';
import {JoinButton} from '../components/activities/activityDetails/JoinButton.tsx';
import {LeaveButton} from '../components/activities/activityDetails/LeaveButton.tsx';

interface LocationState {
  activity: Activity;
}

const ActivityDetailsPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const activity = state?.activity;

  const {data: averageRating, isLoading: isLoadingRating} = useGetAverageRating(
    activity?.organisationId || ''
  );

  const {data: feedbacks, isLoading: isLoadingFeedbacks} =
    useGetFeedbacksByOrganisation(activity?.organisationId || '');

  const numOfFeedbacks = feedbacks?.length || 0;

  const {
    data: similarActivitiesData,
    isLoading: isLoadingSimilarActivities,
    error: errorSimilarActivities,
  } = useGetVolunteerActivities({
    filters: {type: activity?.activityKind, date: ''},
    size: BIG_NUMBER_FOR_PAGINATION,
  });

  const similarActivities = similarActivitiesData?.filter(
    activityObj => activityObj.activityId !== activity?.activityId
  );

  const toast = useToast();

  const {data: isJoined} = useVolunteerActivityJoined(activity.activityId);

  const {mutate: joinToActivity, isLoading: isLoadingJoinButton} =
    useJoinToActivity({
      onSuccess: () => {
        toast({
          title: 'Activity joined successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      },
      onError: error => {
        toast({
          title: 'An error occurred',
          description: error instanceof Error ? error.message : String(error),
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    });

  const handleJoinActivity = () => {
    joinToActivity(activity.activityId);
  };

  const {mutate: leaveActivity, isLoading: isLoadingLeaveActivityButton} =
    useLeaveActivity({
      onSuccess: () => {
        toast({
          title: 'Activity cancelled successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      },
      onError: error => {
        toast({
          title: 'An error occurred',
          description: error instanceof Error ? error.message : String(error),
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    });

  const handleCancelActivity = () => {
    leaveActivity(activity.activityId);
  };

  if (!activity) {
    return (
      <Alert status="error">
        <AlertIcon />
        Activity not found
      </Alert>
    );
  }

  return (
    <Flex direction="column" p={4} bg="gray.100" minH="100vh">
      <Flex
        direction="column"
        w="1200px"
        maxW="1200px"
        mx="auto"
        bg="white"
        shadow="lg"
        borderRadius="lg"
        overflow="hidden"
      >
        <Box p={6} textAlign="center">
          <Text fontSize="4xl" fontWeight="bold" mb={2}>
            {activity.activityTitle}
          </Text>
        </Box>

        <CustomImageGallery
          galleryImages={activity.activityGalleryImages}
          coverImage={activity.activityCoverImage}
        />

        <Box p={6}>
          <Flex justify="space-between" mb={6}>
            <ActivityInfo activity={activity} />

            <Box flex="1">
              <Rating
                averageRating={averageRating}
                isLoadingRating={isLoadingRating}
              />
              <FeedbackCount
                numOfFeedbacks={numOfFeedbacks}
                isLoadingFeedbacks={isLoadingFeedbacks}
              />

              <MapContainer
                center={[activity.activityLatitude, activity.activityLongitude]}
                zoom={13}
                style={{height: '200px', width: '100%', borderRadius: 'lg'}}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Marker
                  position={[
                    activity.activityLatitude,
                    activity.activityLongitude,
                  ]}
                >
                  <Popup>{activity.activityTitle}</Popup>
                </Marker>
              </MapContainer>
            </Box>
          </Flex>
        </Box>

        <>
          {isJoined ? (
            <LeaveButton
              isLoading={isLoadingLeaveActivityButton}
              onLeave={handleCancelActivity}
            />
          ) : (
            <JoinButton
              isLoading={isLoadingJoinButton}
              onJoin={handleJoinActivity}
            />
          )}
        </>

        <Box p={6} bg="gray.50">
          <SimilarListings
            isLoading={isLoadingSimilarActivities}
            activities={similarActivities}
            error={errorSimilarActivities}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default ActivityDetailsPage;
