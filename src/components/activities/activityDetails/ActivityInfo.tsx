import React from 'react';
import {Box, Heading, Text, VStack, Avatar, HStack, Flex} from '@chakra-ui/react';

import {Activity} from '../../../api/types.ts';
import CleanUp from '../../../../resources/cleanup.jpg';
import CustomImageGallery from './ImageGallery.tsx';

interface ActivityInfoProps {
  activity: Activity;
}

const ActivityInfo: React.FC<ActivityInfoProps> = ({ activity }) => {
  const images = {
    galleryImages: [CleanUp, CleanUp, CleanUp, CleanUp],
    coverImage: CleanUp,
  };

  return (
    <Box bg="white" p={4} rounded="md" shadow="md" >
      <Flex direction={{ base: 'column', md: 'row' }} spacing={4}>
        <VStack align="stretch" flex="1" p={4}>
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
        </VStack>
        <Box flex="1" p={4} maxW={{ base: '100%', md: '400px' }} maxH="600px">
          <CustomImageGallery galleryImages={images.galleryImages} coverImage={images.coverImage} />
        </Box>
      </Flex>
    </Box>
  );
};

export default ActivityInfo;
