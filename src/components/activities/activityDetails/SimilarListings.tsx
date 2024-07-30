import { Box, Heading, SimpleGrid, Image, Text, VStack, HStack } from '@chakra-ui/react';
import {Activity} from '../../../api/types.ts';
import CleanUp from '../../../../resources/cleanup.jpg';
const mockSimilarActivities: Activity[] = [
  {
    activityId: '2',
    activityTitle: 'Park Cleanup',
    activityDescription: 'Help clean up the local park.',
    activityCity: 'New York',
    activityCountry: 'USA',
    activityDateOfPlace: '2023-05-10',
    activityKind: 'ENVIRONMENT',
    activityDistance: 5,
    galleryImages: [],
    organisationAddress: '123 Green St',
    organisationName: 'Green Earth',
    organisationCity: 'New York',
    organisationCountry: 'USA',
    organisationId: '1',
    activityCoverImage: CleanUp,
    activityLocation: {
      latitude: 40.7128,
      longitude: -74.0060
    }
  },
  {
    activityId: '3',
    activityTitle: 'Food Drive',
    activityDescription: 'Collect and distribute food to those in need.',
    activityCity: 'Los Angeles',
    activityCountry: 'USA',
    activityDateOfPlace: '2023-06-15',
    activityKind: 'COMMUNITY',
    activityDistance: 10,
    galleryImages: [],
    organisationAddress: '456 Helping Ave',
    organisationName: 'Helping Hands',
    organisationCity: 'Los Angeles',
    organisationCountry: 'USA',
    organisationId: '2',
    activityCoverImage: CleanUp,
    activityLocation: {
      latitude: 34.0522,
      longitude: -118.2437
    }
  },
  {
    activityId: '4',
    activityTitle: 'Food Drive',
    activityDescription: 'Collect and distribute food to those in need.',
    activityCity: 'Los Angeles',
    activityCountry: 'USA',
    activityDateOfPlace: '2023-06-15',
    activityKind: 'COMMUNITY',
    activityDistance: 10,
    galleryImages: [],
    organisationAddress: '456 Helping Ave',
    organisationName: 'Helping Hands',
    organisationCity: 'Los Angeles',
    organisationCountry: 'USA',
    organisationId: '2',
    activityCoverImage: CleanUp,
    activityLocation: {
      latitude: 34.0522,
      longitude: -118.2437
    }
  }
];

const SimilarListings: React.FC = () => {
  return (
    <Box bg="white" p={4} rounded="md" shadow="md">
      <Heading as="h3" size="md">Similar Volunteer Activities</Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} mt={4}>
        {mockSimilarActivities.map((activity) => (
          <Box key={activity.activityId} bg="white" rounded="md" shadow="md" overflow="hidden">
            <Image src={activity.activityCoverImage} alt={activity.activityTitle} />
            <VStack p={4} align="start">
              <Text fontWeight="bold">{activity.activityTitle}</Text>
              <Text>{activity.activityDescription}</Text>
              <HStack spacing={2} mt={2}>
                <Text>{activity.activityCity}</Text>
                <Text>{activity.activityCountry}</Text>
                <Text>{new Date(activity.activityDateOfPlace).toLocaleDateString()}</Text>
              </HStack>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SimilarListings;