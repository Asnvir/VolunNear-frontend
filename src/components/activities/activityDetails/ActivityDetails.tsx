import {Box, Text, Icon} from '@chakra-ui/react';
import {FaMapMarkerAlt, FaCalendarAlt} from 'react-icons/fa';

export type ActivityDetailsProps = {
  date: number;
  location: string;
  distance: number;
};

export const ActivityDetails = ({
  date,
  location,
  distance,
}: ActivityDetailsProps) => {
  return (
    <Box mb={4}>
      <Text>
        <Icon as={FaCalendarAlt} mr={2} />
        {new Date(date).toLocaleDateString()} at{' '}
        {new Date(date).toLocaleTimeString()}
      </Text>
      <Text>
        <Icon as={FaMapMarkerAlt} mr={2} />
        {location}
      </Text>
      <Text>Distance: {distance.toFixed(2)} km</Text>
    </Box>
  );
};
