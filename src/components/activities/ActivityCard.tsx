import {Box, Heading, Text, Image, HStack} from '@chakra-ui/react';
import NoImage from '../../../resources/No_image_available.png';
import {stripHtmlTags} from '../../utils/stripHtmlTags.ts';
import {beautifyActivityType} from '../../utils/kindToButyType.ts';
import {formatDateWithoutSeconds} from '../../utils/formatDateWithoutSeconds.ts';
interface ActivityCardProps {
  activity: {
    activityId: string;
    activityTitle: string;
    activityDescription: string;
    activityCity: string;
    activityCountry: string;
    activityDateOfPlace: string;
    activityKind: string;
    activityCoverImage: string;
    activityDistance: number;
  };
  onClick: (activity: any) => void;
}

export const ActivityCard = ({activity, onClick}: ActivityCardProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      _hover={{
        boxShadow: 'lg',
        transform: 'translateY(-16px)',
        transition: 'all 0.2s',
      }}
      width="100%"
      maxW="100%"
      cursor="pointer"
      bg="white"
      onClick={() => onClick(activity)}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      zIndex={100}
    >
      <Box>
        <Box width="100%" height="200px" overflow="hidden" mb={6}>
          <Image
            src={activity.activityCoverImage || NoImage}
            alt={activity.activityTitle}
            width="100%"
            height="100%"
            objectFit="contain"
          />
        </Box>
        <Box px={6} pb={6}>
          <Heading as="h3" size="md" mb="2" isTruncated>
            {activity.activityTitle}
          </Heading>
          <Text mb="4" noOfLines={2}>
            {stripHtmlTags(activity.activityDescription)}
          </Text>
          <HStack mb="4">
            <Text fontWeight="bold">{activity.activityCity}</Text>
            <Text>, {activity.activityCountry}</Text>
          </HStack>
          <Text mb="2">
            {formatDateWithoutSeconds(new Date(activity.activityDateOfPlace))}
          </Text>
          <Text mb="4">
            Type: {beautifyActivityType(activity.activityKind)}
          </Text>
          <Text>Distance: {activity.activityDistance.toFixed(2)} km</Text>
        </Box>
      </Box>
    </Box>
  );
};
