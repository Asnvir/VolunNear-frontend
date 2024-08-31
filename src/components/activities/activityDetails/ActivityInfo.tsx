import {Box, Flex, Stack, Text} from '@chakra-ui/react';
import {FaCalendarAlt, FaMapMarkerAlt, FaRoute} from 'react-icons/fa';
import {Activity} from '../../../api/types.ts';

type ActivityInfoProps = {
  activity: Activity;
};

export const ActivityInfo = ({activity}: ActivityInfoProps) => {
  return (
    <Box flex="1" mr={4}>
      <Stack spacing={4}>
        <Text fontSize="2xl" fontWeight="semibold">
          Organisation: {activity.organisationName}
        </Text>

        <Flex alignItems="center">
          <FaCalendarAlt style={{marginRight: '8px'}} />
          <Text>
            {new Date(activity.activityDateOfPlace).toLocaleDateString()} at{' '}
            {new Date(activity.activityDateOfPlace).toLocaleTimeString()}
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
  );
};
