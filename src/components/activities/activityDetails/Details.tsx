import React from 'react';
import {Box, Heading, HStack, Text, VStack} from '@chakra-ui/react';
import {FaBed, FaBath, FaCar, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTag} from 'react-icons/fa';
import {Activity} from '../../../api/types.ts';

interface DetailsProps {
  activity: Activity;
}

const Details: React.FC<DetailsProps> = ({ activity }) => {
  return (
    <Box bg="white" p={4} rounded="2xl" shadow="md">
      <Heading as="h3" size="md" li>Details</Heading>
      <HStack flex={1} justify={'space-around'} mt={6} px={40}>
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
