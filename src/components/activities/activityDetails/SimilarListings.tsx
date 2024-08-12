import {Box, Heading, Image, Text, VStack, HStack, Spinner, Alert, AlertIcon} from '@chakra-ui/react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Activity } from '../../../api/types';
import {ActivityCard} from '../ActivityCard.tsx';


interface SimilarListingsProps {
  activities?: Activity[];
  isLoading: boolean;
  error?: string;
}

const SimilarListings: React.FC<SimilarListingsProps> = ({ activities, isLoading, error, onCardClick }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" color="teal.500" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" variant="subtle">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text>No similar activities found.</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Heading as="h3" size="md" mb={6} textAlign="start">
        Similar Volunteer Activities
      </Heading>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        showDots={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
      >
        {activities.map((activity) => (
          <Box key={activity.activityId} m={3} >
            <ActivityCard activity={activity} onClick={onCardClick} />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default SimilarListings;