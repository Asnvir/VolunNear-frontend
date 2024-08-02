import React from 'react';
import { useLocation} from 'react-router-dom';
import {
  Box,
  VStack,
  Alert,
  AlertIcon,
  Divider,
  Heading,
  Icon,
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


interface LocationState {
  activity: Activity;
}

const ActivityDetailsPage: React.FC = () => {
  const { state } = useLocation<LocationState>();

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
    <Box p={4}>
      <VStack spacing={8} align="stretch" maxW="1000px" mx="auto">
        <Heading as="h1" size="2xl" mb="4" textAlign="start">{activity.activityTitle}</Heading>
        <CustomImageGallery galleryImages={activity.galleryImages} coverImage={activity.coverImage} />
        <Flex direction={{ base: 'column', md: 'row' }} gap={6} align="flex-start">
          <Box flex="1" maxW={{ base: '100%', md: '60%' }}>
            <VStack align="flex-start" spacing={4}>
              <Box>
                <Text fontSize="lg" fontWeight="bold">{activity.organisationCity}, {activity.organisationCountry}</Text>
              </Box>
              <Box>
                <Text fontSize="lg" fontWeight="bold">{new Date(activity.activityDateOfPlace).toLocaleDateString()}</Text>
              </Box>
            </VStack>
            <Divider my={4} />
            <Box mt={4}>
              <OrganizationInfo
                avatar={activity.organisationAvatarUrl}
                name={activity.organisationName}
                location={activity.organisationCountry + " " + activity.organisationCity}
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
                numberOfReviews={45}
                rating={4.8}
              />
            </Box>
            <Divider my={4} />
          </Box>
          <Box flex="0 0 375px">
            <AssignToActivity activityId={activity.activityId}/>
          </Box>
        </Flex>
        <Heading as="h3" size="lg">Location</Heading>
        <Box>
          <Text fontSize="lg" fontWeight="bold">{activity.activityCountry}, {activity.activityCity} , {activity.nestedActivityStreet}, {activity.nestedActivityNumberOfHouse}</Text>
        </Box>
        <MapComponent latitude={activity.activityLatitude} longitude={activity.activityLongitude} />
        <SimilarListings />
      </VStack>
    </Box>
  );
};

export default ActivityDetailsPage;