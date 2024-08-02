import React from 'react';
import { Box, Heading, Text, Image, HStack} from '@chakra-ui/react';
import NoImage from '../../../resources/No_image_available.png';
interface ActivityCardProps {
  activity: {
    activityTitle: string;
    activityDescription: string;
    activityCity: string;
    activityCountry: string;
    activityDateOfPlace: string;
    activityKind: string;
    activityCoverImage: string; // Optional image URL
  };
  onClick: (activity: any) => void;
}


export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onClick }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      _hover={{ boxShadow: 'lg', transform: 'translateY(-16px)', transition: 'all 0.2s' }}
      width="100%"
      maxW="100%"
      cursor="pointer"
      bg = "white"
      onClick={() => onClick(activity)}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Image
          src={activity.activityCoverImage || NoImage}
          alt={activity.activityTitle}
          borderTopRadius="lg"
          mb="4"
          height="200px"
          width="100%"
          objectFit="crop"
          onClick={() => onClick(activity)}
        />
        <Box p="6">
          <Heading as="h3" size="md" mb="2" isTruncated>
            {activity.activityTitle}
          </Heading>
          <Text mb="2" noOfLines={2}>
            {activity.activityDescription}
          </Text>
          <HStack mb="2">
            <Text fontWeight="bold">{activity.activityCity}</Text>
            <Text>, {activity.activityCountry}</Text>
          </HStack>
          <Text mb="2">{new Date(activity.activityDateOfPlace).toLocaleString()}</Text>
          <Text>Type: {activity.activityKind}</Text>
        </Box>
      </Box>
    </Box>
  );
};

