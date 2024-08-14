import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  Image,
  Flex,
  SimpleGrid, useToast,
} from '@chakra-ui/react';
import {Rating, Star} from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import {useLocation} from 'react-router-dom';
import NoImage from '../../resources/No_image_available.png';
import {Organization} from '../api/services/organizations/types.ts';
import {usePostFeedback} from '../hooks/feedbacks/usePostFeedback/usePostFeedback.ts';
import {useAddOrUpdateRating} from '../hooks/organizations/userAddOrUpdateRating/useAddOrUpdateRating.ts';

interface LocationState {
  organisation: Organization;
}
const OrganizationDetailsPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const { state } = useLocation<LocationState>();
  const organisation = state?.organisation;
  const toast = useToast();

  const {mutate: postFeedback} = usePostFeedback();
  const {mutate: rateOrganisation} = useAddOrUpdateRating();

  const handleFeedbackSubmit = () => {
    rateOrganisation(
      { orgId: organisation.id, rating },
      {
        onSuccess: () => {
          toast({
            title: 'Rating submitted.',
            description: 'Your rating has been successfully submitted.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          postFeedback(
            { idOfOrganisation: organisation.id, rate:rating, feedbackDescription:feedback },
            {
              onSuccess: () => {
                toast({
                  title: 'Feedback submitted.',
                  description: 'Your feedback has been successfully submitted.',
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                });

                console.log('Feedback and rating submitted successfully');
              },
              onError: (error) => {
                toast({
                  title: 'Error submitting feedback.',
                  description: error?.message || 'Unable to submit feedback. Please try again later.',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                });
                console.error('Error submitting feedback:', error);
              },
            }
          );
        },
        onError: (error) => {
          toast({
            title: 'Error submitting rating.',
            description: error?.message || 'Unable to submit rating. Please try again later.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          console.error('Error submitting rating:', error);
        },
      }
    );

    onClose();
  };

  return (
    <Box p={4}>
      <VStack spacing={8} align="stretch" maxW="1000px" mx="auto">

        {/* Header Section */}
        <Heading as="h1" size="2xl" mb="4" textAlign="start">
          {organisation.nameOfOrganisation}
        </Heading>

        {/* Image and Description Section */}
        <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
          {/* Organization Image */}
          <Image
            src={organisation.avatarUrl || NoImage}
            alt="Organization Image"
            borderRadius="md"
            maxW={{ base: "100%", md: "60%" }}
          />

          {/* Description Box */}
          <Box bg="gray.100" p={6} borderRadius="md" flex="1">
            <Text fontSize="lg" mb={4}>
              <strong>Country:</strong> {organisation.country}
            </Text>
            <Text fontSize="lg" mb={4}>
              <strong>City:</strong> {organisation.city}
            </Text>
            <Text fontSize="lg" mb={4}>
              <strong>Address:</strong> {organisation.address}
            </Text>
            <Text fontSize="lg" mb={4}>
              <strong>Number of Reviews:</strong> {0}
            </Text>
            <Text fontSize="lg" mb={4}>
              <strong>Rating:</strong> {4.5.toFixed(1)}
            </Text>
            <Button variant="primary" onClick={onOpen}>
              Add Feedback
            </Button>
          </Box>
        </Flex>

        {/* Feedback Form Modal */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Feedback Form</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Rating
                orientation='horizontal'
                style={{ maxWidth: 100 }}
                value={rating}
                onChange={(value) => setRating(value)}
                itemStyles={
                  {
                    itemShapes: Star,
                    activeFillColor: 'orange',
                    inactiveFillColor: 'gray',
                  }
                }
              />
              <Textarea
                mt={4}
                placeholder="Text for feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="primary" mr={3} onClick={handleFeedbackSubmit}>
                Submit
              </Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Slider Section */}
        <Heading as="h3" size="lg" mb="4">Organisation Activities</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Box bg="gray.100" height="200px" borderRadius="md"></Box>
          <Box bg="gray.100" height="200px" borderRadius="md"></Box>
          <Box bg="gray.100" height="200px" borderRadius="md"></Box>
        </SimpleGrid>

        {/* Feedback List Section */}
        <Box mt={8}>
          <Heading as="h3" size="lg">Feedback</Heading>
          <VStack spacing={4} mt={4}>
            <Box bg="gray.100" p={4} borderRadius="md">Feedback 1</Box>
            <Box bg="gray.100" p={4} borderRadius="md">Feedback 2</Box>
            <Box bg="gray.100" p={4} borderRadius="md">Feedback 3</Box>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default OrganizationDetailsPage;
