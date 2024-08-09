import React, {useEffect, useState} from 'react';
import { useLocation} from 'react-router-dom';
import {
  Box,
  VStack,
  Alert,
  AlertIcon,
  Divider,
  Heading,
  Text,
 Flex,
} from '@chakra-ui/react';
import { Activity } from '../api/types';
import Description from '../components/activities/activityDetails/Description.tsx';
import SimilarListings from '../components/activities/activityDetails/SimilarListings.tsx';
import MapComponent from '../components/activities/activityDetails/MapComponent.tsx';
import CustomImageGallery from '../components/activities/activityDetails/ImageGallery.tsx';
import AssignToActivity from '../components/activities/activityDetails/AssignToActivity.tsx';
import OrganizationInfo from '../components/activities/activityDetails/OrganistaionInfo.tsx';
import OrganisationDetails from '../components/activities/activityDetails/OrganisationDetails.tsx';
import {useGetAverageRating} from '../hooks/organizations/useGetAvarageRating/useGetAverageRating.ts';
import {useGetActivities} from '../hooks/activities/useGetActivities/useGetActivities.ts';


interface LocationState {
  activity: Activity;
}

const ActivityDetailsPage: React.FC = () => {
  const { state } = useLocation<LocationState>();
  const activity = state?.activity;

  // Fetch average rating
  const { data: averageRatingData, isLoading: isLoadingRating } = useGetAverageRating(activity?.organisationId || '');
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (!isLoadingRating && averageRatingData !== undefined) {
      setAverageRating(averageRatingData);
    }
  }, [isLoadingRating, averageRatingData]);

  // Fetch similar activities
  const {
    data: similarActivities,
    isLoading: isLoadingActivities,
    error: errorActivities,
  } = useGetActivities({
    isMyActivities: false,
    filters: { type: activity?.activityKind, date: ''},
  });

  if (!activity) {
    return (
      <Alert status="error">
        <AlertIcon />
        Activity not found
      </Alert>
    );
  }

  return (
    <Box p={4}>
      <VStack spacing={8} align="stretch" maxW="1000px" mx="auto">
        <Heading as="h1" size="2xl" mb="4" textAlign="start">
          {activity.activityTitle}
        </Heading>
        <CustomImageGallery galleryImages={activity.activityGalleryImages} coverImage={activity.activityCoverImage} />
        <Flex direction={{ base: 'column', md: 'row' }} gap={6} align="flex-start">
          <Box flex="1" maxW={{ base: '100%', md: '60%' }}>
            <VStack align="flex-start" spacing={4}>
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  {activity.organisationCity}, {activity.organisationCountry}
                </Text>
              </Box>
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  {new Date(activity.activityDateOfPlace).toLocaleDateString()}
                </Text>
              </Box>
            </VStack>
            <Divider my={4} />
            <Box mt={4}>
              <OrganizationInfo
                avatar={activity.organisationAvatarUrl}
                name={activity.organisationName}
                location={`${activity.organisationCountry} ${activity.organisationCity}`}
              />
            </Box>
            <Divider my={4} />
            <Description description={activity.activityDescription} />
            <Divider my={4} />
            <Box mt={4} my={6}>
              <Heading as="h3" size="lg">Posted By</Heading>
              <OrganisationDetails
                avatarUrl={activity.organisationAvatarUrl}
                name={activity.organisationName}
                numberOfReviews={45} // This can be replaced with real data if available
                rating={averageRating}
              />
            </Box>
            <Divider my={4} />
          </Box>
          <Box flex="0 0 375px">
            <AssignToActivity activityId={activity.activityId} />
          </Box>
        </Flex>
        <Heading as="h3" size="lg">Location</Heading>
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            {activity.activityCountry}, {activity.activityCity}, {activity.activityStreet}, {activity.activityNumberOfHouse}
          </Text>
        </Box>
        <MapComponent latitude={activity.activityLatitude} longitude={activity.activityLongitude} />
        <Divider my={4} />
        <SimilarListings
          activities={similarActivities} // Pass the fetched similar activities
          isLoading={isLoadingActivities} // Pass loading state
          error={errorActivities} // Pass error state
        />
      </VStack>
    </Box>
  );
};

export default ActivityDetailsPage;