import { Box, Heading, Image, Text, VStack, HStack } from '@chakra-ui/react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Activity } from '../../../api/types';
import CleanUp from '../../../../resources/cleanup.jpg';
import NoImage from '../../../../resources/No_image_available.png';


//TODO: fetch similar activities from the backend
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
    activityTitle: 'Beach Cleanup',
    activityDescription: 'Join us for a beach cleanup event to keep our shores clean.',
    activityCity: 'Los Angeles',
    activityCountry: 'USA',
    activityDateOfPlace: '2023-06-15',
    activityKind: 'ENVIRONMENT',
    activityDistance: 15,
    galleryImages: [],
    organisationAddress: '789 Ocean Ave',
    organisationName: 'Blue Oceans',
    organisationCity: 'Los Angeles',
    organisationCountry: 'USA',
    organisationId: '3',
    activityCoverImage: '',
    activityLocation: {
      latitude: 34.0522,
      longitude: -118.2437
    }
  }
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const SimilarListings: React.FC = () => {
  return (
    <Box>
      <Heading as="h3" size="md" mb={4}>Similar Volunteer Activities</Heading>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        showDots={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {mockSimilarActivities.map((activity) => (
          <Box
            key={activity.activityId}
            bg="white"
            rounded="2xl"
            shadow="md"
            overflow="hidden"
            m={2}
            width="300px"
            height="400px"
            display="flex"
            flexDirection="column"
          >
            <Image src={activity.activityCoverImage || NoImage} alt={activity.activityTitle} height="200px" width="100%" objectFit="crop" />
            <VStack p={4} align="start" flex="1" justifyContent="space-between">
              <Box>
                <Text fontWeight="bold">{activity.activityTitle}</Text>
                <Text>{activity.activityDescription}</Text>
              </Box>
              <HStack spacing={2}>
                <Text>{activity.activityCity}</Text>
                <Text>{activity.activityCountry}</Text>
                <Text>{new Date(activity.activityDateOfPlace).toLocaleDateString()}</Text>
              </HStack>
            </VStack>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default SimilarListings;