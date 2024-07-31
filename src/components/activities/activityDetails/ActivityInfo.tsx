import React, {useEffect, useState} from 'react';
import {Box, Heading, Text, VStack, Flex, Avatar, HStack, Button, useToast} from '@chakra-ui/react';
import { Activity } from '../../../api/types';

import CleanUp from '../../../../resources/cleanup.jpg';
import CustomImageGallery from './ImageGallery.tsx';

import {useLeaveActivity} from '../../../hooks/activities/useLeaveActivity/useLeaveActivity.ts';
import {useJoinToActivity} from '../../../hooks/activities/useJoinToActivity/useJoinToActivity.ts';

interface ActivityInfoProps {
  activity: Activity;
}

const ActivityInfo: React.FC<ActivityInfoProps> = ({ activity }) => {
  const [isJoined, setIsJoined] = useState(false);
  const toast = useToast();

  const {mutate: joinToActivity} =  useJoinToActivity();
  const {mutate: leaveActivity} = useLeaveActivity();

  const handleJoinActivity = () => {
    // Add logic to join the activity
    setIsJoined(true);
    joinToActivity(activity.activityId,
      {
        onSuccess: () => {
          toast(
            {
              title: 'Activity joined successfully',
              status: 'success',
              duration: 5000,
              isClosable: true,
            }
          )
        },
        onError: (error) => {
          toast({
            title: 'An error occurred',
            description: error,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
      }
      );
  };

  const handleCancelActivity = () => {
    setIsJoined(false);
    leaveActivity(activity.activityId,
      {
        onSuccess: () => {
          toast(
            {
              title: 'Activity cancelled successfully',
              status: 'success',
              duration: 5000,
              isClosable: true,
            }
          )
        },
        onError: (error) => {
          toast({
            title: 'An error occurred',
            description: error,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
      }
    );
  };


  const images = {
    galleryImages: [CleanUp, CleanUp, CleanUp, CleanUp],
    coverImage: CleanUp,
  };

  return (
    <Box bg="white" p={4} rounded="md" shadow="md">
      <Flex direction={{ base: 'column', md: 'row' }} spacing={4}>
        <VStack align="stretch" flex="0.3" p={4}>
          <Heading as="h2" size="lg">{activity.activityTitle}</Heading>
          <Text>{activity.activityCity}, {activity.activityCountry}</Text>
          <Text fontSize="2xl" fontWeight="bold">{new Date(activity.activityDateOfPlace).toLocaleDateString()}</Text>
          <Text>Type: {activity.activityKind}</Text>
          <HStack spacing={4} mt={4}>
            <Avatar src={activity.organisationAvatarImage} size="md" />
            <VStack align="start">
              <Text fontWeight="bold">{activity.organisationName}</Text>
              <Text>{activity.organisationAddress}</Text>
            </VStack>
          </HStack>
          <Box mt={4}>
            {isJoined ? (
              <Button colorScheme="red" onClick={handleCancelActivity}>
                Cancel
              </Button>
            ) : (
              <Button variant="primary" onClick={handleJoinActivity}>
                Join Activity
              </Button>
            )}
          </Box>
        </VStack>
        <Box flex="0.7" p={4} maxW={{ base: '100%', md: '700px' }} maxH="600px">
          <CustomImageGallery galleryImages={images.galleryImages} coverImage={images.coverImage} />
        </Box>
      </Flex>
    </Box>
  );
};

export default ActivityInfo;
