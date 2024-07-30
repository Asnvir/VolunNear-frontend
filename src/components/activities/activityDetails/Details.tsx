import React from 'react';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import {FaBed, FaBath, FaCar, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTag} from 'react-icons/fa';
import {Activity} from '../../../api/types.ts';

interface DetailsProps {
  activity: Activity;
}

const Details: React.FC<DetailsProps> = ({ activity }) => {
  return (
    <Box bg="white" p={4} rounded="md" shadow="md">
      <HStack flex={1} justify={'space-between'}>
        <VStack>
          <FaMapMarkerAlt />
          <Text>{activity.activityCity}, {activity.activityCountry}</Text>
        </VStack>
        <VStack>
          <FaClock />
          <Text>{new Date(activity.activityDateOfPlace).toLocaleString()}</Text>
        </VStack>
        <VStack>
          <FaTag />
          <Text>{activity.activityKind}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Details;
