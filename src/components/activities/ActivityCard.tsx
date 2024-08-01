import {Box, Heading, Text} from '@chakra-ui/react';
import {Activity} from '../../api/types.ts';

type ActivityCardProps = {
  activity: Activity;
  onClick: () => void;
};

export const ActivityCard = ({activity, onClick}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      boxShadow="lg"
      width="100%"
      maxW="100%"
      cursor="pointer"
      onClick={() => onClick(activity)}
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
