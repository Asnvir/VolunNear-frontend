import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Button,
} from '@chakra-ui/react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { StarIcon } from '@chakra-ui/icons';

const TestimonialCarousel = ({ feedbacks = [] }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const truncateText = (text, length) => {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
  };

  const handleReadMore = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
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

  return (
    <Box py={12}>
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} textAlign="center">
        <Heading mb={4} fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold">
          Our happy volunteers say about us
        </Heading>
        <Text fontSize="lg" mb={10}>
          {`${feedbacks.length} people have shared their feedback`}
        </Text>

        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          showDots={true}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
          dotListClass="custom-dot-list-style"
          arrows={false}
        >
          {feedbacks.length > 0 && feedbacks.map((feedback, index) => (
            <Box
              key={feedback.id}
              bg="white"
              p={6}
              rounded="lg"
              shadow="lg"
              textAlign="left"
              m={3}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="350px" // Adjusted height for better visual balance
            >
              <Flex alignItems="center" mb={4}>
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < feedback.rate ? 'orange.400' : 'gray.300'}
                      boxSize={5}
                    />
                  ))}
              </Flex>
              <Text mb={4} fontSize="md" fontStyle="italic" noOfLines={expandedIndex === index ? undefined : 3}>
                {expandedIndex === index
                  ? feedback.description
                  : truncateText(feedback.description, 150)}
              </Text>
              {feedback.description && feedback.description.length > 150 && (
                <Button
                  variant="link"
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleReadMore(index)}
                  alignSelf="flex-start"
                >
                  {expandedIndex === index ? 'Read Less' : 'Read More'}
                </Button>
              )}
              <Flex alignItems="center" mt="auto">
                <Image
                  src={feedback.avatarUrl || 'https://via.placeholder.com/44'}
                  alt={feedback.realNameOfUser || feedback.username}
                  rounded="full"
                  boxSize="44px"
                  objectFit="cover"
                />
                <Box ml={4}>
                  <Text fontWeight="bold">
                    {feedback.realNameOfUser || feedback.username}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {'Volunteer'}
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default TestimonialCarousel;
