import {Box, Heading, Spinner, Alert, AlertIcon} from '@chakra-ui/react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {Activity} from '../../../api/types';
import {ActivityCard} from '../ActivityCard.tsx';
import {useNavigate} from 'react-router-dom';
import React from 'react';

interface SimilarListingsProps {
  activities?: Activity[];
  isLoading: boolean;
  error?: string;
}

const SimilarListings: React.FC<SimilarListingsProps> = ({
  activities,
  isLoading,
  error,
}) => {
  const navigate = useNavigate();

  const navigateToActivity = (activity: Activity) => {
    console.log('Navigating to activity:', activity.activityTitle);
    navigate(`/activity/${activity.activityId}`, {state: {activity}});
    window.scrollTo(0, 0);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: {max: 4000, min: 3000},
      items: 5,
    },
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 3,
    },
    tablet: {
      breakpoint: {max: 1024, min: 464},
      items: 2,
    },
    mobile: {
      breakpoint: {max: 464, min: 0},
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
        <Heading as="h4" size="md">
          No similar events found.
        </Heading>
      </Box>
    );
  }

  return (
    <Box mt="30px">
      <Heading as="h3" size="md" mb={6} textAlign="start">
        Similar events
      </Heading>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        showDots={true}
        removeArrowOnDeviceType={['tablet', 'mobile']}
        dotListClass="custom-dot-list-style"
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {activities.map(activity => (
          <Box key={activity.activityId} p={2}>
            <ActivityCard activity={activity} onClick={navigateToActivity} />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default SimilarListings;
