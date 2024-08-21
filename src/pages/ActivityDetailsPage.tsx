import React from 'react';
import {useLocation} from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import {FaCalendarAlt, FaMapMarkerAlt, FaRoute, FaStar} from 'react-icons/fa';
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

interface LocationState {
  activity: Activity;
}

const ActivityDetailsPage: React.FC = () => {
  const {state} = useLocation<LocationState>();
  const activity = state?.activity;

  console.log(activity);

  // Fetch average rating
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
  });

  const similarActivities = similarActivitiesData?.filter(
    activityObj => activityObj.activityId !== activity?.activityId
  );

  const toast = useToast();

  const {data: isJoined, isLoading} = useVolunteerActivityJoined(
    activity.activityId
  );
  const {mutate: joinToActivity} = useJoinToActivity();
  const {mutate: leaveActivity} = useLeaveActivity();

  const handleJoinActivity = () => {
    // Add logic to join the activity
    joinToActivity(activity.activityId, {
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
          description: error,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  const handleCancelActivity = () => {
    leaveActivity(activity.activityId, {
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
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    });
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
            <Box flex="1" mr={4}>
              <Stack spacing={4}>
                <Text fontSize="2xl" fontWeight="semibold">
                  Organisation: {activity.organisationName}
                </Text>
                <Flex alignItems="center">
                  <FaStar color="black" style={{marginRight: '8px'}} />
                  <Text>{averageRating}</Text>
                </Flex>

                <Flex alignItems="center">
                  <FaCalendarAlt style={{marginRight: '8px'}} />
                  <Text>
                    {new Date(
                      activity.activityDateOfPlace
                    ).toLocaleDateString()}{' '}
                    at{' '}
                    {new Date(
                      activity.activityDateOfPlace
                    ).toLocaleTimeString()}
                  </Text>
                </Flex>

                <Flex alignItems="center">
                  <FaMapMarkerAlt style={{marginRight: '8px'}} />
                  <Text>
                    {`${activity.activityStreet} ${activity.activityNumberOfHouse}, ${activity.activityCity}, ${activity.activityCountry}`}
                  </Text>
                </Flex>

                <Flex alignItems="center">
                  <FaRoute style={{marginRight: '8px'}} />
                  <Text>{activity.activityDistance.toFixed(2)} km</Text>
                </Flex>

                <Box>
                  <Text>Description</Text>
                  <Box
                    fontSize="md"
                    color="gray.500"
                    dangerouslySetInnerHTML={{
                      __html: activity.activityDescription,
                    }}
                  />
                </Box>
              </Stack>
            </Box>

            <Box flex="1">
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

        <Flex justify="center" mb={6}>
          {!isLoading && (
            <Button
              colorScheme={isJoined ? 'red' : 'primary'}
              onClick={isJoined ? handleCancelActivity : handleJoinActivity}
            >
              {isJoined ? 'Leave Event' : 'Join Event'}
            </Button>
          )}
        </Flex>

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
