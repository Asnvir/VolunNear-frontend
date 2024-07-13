import {Box, Heading, Text} from '@chakra-ui/react';
import {Activity} from '../api/types.ts';

type ActivityCardProps = {
  activity: Activity;
};

export const ActivityCard = ({activity}: ActivityCardProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      boxShadow="lg"
      width="100%"
      maxW="100%"
    >
      <Heading as="h3" size="md" mb="2">
        {activity.activityTitle}
      </Heading>
      <Text>{activity.activityDescription}</Text>
      <Text>
        {activity.activityCity}, {activity.activityCountry}
      </Text>
      <Text>{new Date(activity.activityDateOfPlace).toLocaleString()}</Text>
      <Text>Type: {activity.activityKind}</Text>
    </Box>
  );
};
