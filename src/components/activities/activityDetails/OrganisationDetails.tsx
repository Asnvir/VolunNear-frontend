import {Box, Avatar, Text, VStack, HStack, Icon, Heading, Flex, Divider} from '@chakra-ui/react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import React from 'react';

interface OrganizationReviewsProps {
  avatarUrl: string;
  name: string;
  numberOfReviews: number;
  rating: number;
  testimonials: string;
}
//TODO: Get reviews and rating from backend
const OrganisationDetails: React.FC<OrganizationReviewsProps> = ({
                                                                   avatarUrl,
                                                                   name,
                                                                   numberOfReviews,
                                                                   rating,
                                                                 }) => {
  return (
    <Flex p={4} borderWidth="1px" overflow="hidden" rounded="lg" boxShadow="lg" bg="white" justifyContent={'space-between'} my={6}>
      <HStack alignItems="center" mb={4}>
        <Avatar src={avatarUrl} size="xl" mr={4} />
        <VStack alignItems="flex-start" spacing={0}>
          <Heading as="h2" size="lg">{name}</Heading>
          <Text>Organisation</Text>
        </VStack>
      </HStack>
      <HStack spacing={8} justifyContent="space-between">
        <VStack spacing={2} align="center">
          <Text fontWeight="bold" fontSize="xl">{numberOfReviews}</Text>
          <Text>Reviews</Text>
          <Divider orientation="horizontal" width="100%" />
          <Text fontWeight="bold" fontSize="xl">{rating}</Text>
          <Text>Rating</Text>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default OrganisationDetails;
