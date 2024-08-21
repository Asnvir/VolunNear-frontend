import React, {useEffect, useState} from 'react';
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
  useToast,
  SimpleGrid,
  Divider,
} from '@chakra-ui/react';
import {Rating, Star} from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import {useLocation} from 'react-router-dom';
import NoImage from '../../resources/No_image_available.png';
import {Organization} from '../api/services/organizations/types.ts';
import {usePostFeedback} from '../hooks/feedbacks/usePostFeedback/usePostFeedback.ts';
import {useAddOrUpdateRating} from '../hooks/organizations/userAddOrUpdateRating/useAddOrUpdateRating.ts';
import {useGetOrganizationActivities} from '../hooks/activities/useGetOrganizationActivities/useGetOrganizationActivities.ts';
import SimilarListings from '../components/activities/activityDetails/SimilarListings.tsx';
import {useGetFeedbacksByOrganisation} from '../hooks/feedbacks/useGetFeedbacksByOrganisation/useGetFeedbacksByOrganisation.ts';
import TestimonialCarousel from '../components/TestimonialsCarousel.tsx';

interface LocationState {
  organisation: Organization;
}

const OrganizationDetailsPage: React.FC = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {
    isOpen: isAllFeedbacksOpen,
    onOpen: onAllFeedbacksOpen,
    onClose: onAllFeedbacksClose,
  } = useDisclosure();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const {state} = useLocation<LocationState>();
  const organisation = state?.organisation;
  const toast = useToast();

  const {mutate: postFeedback} = usePostFeedback();
  const {
    data: feedbacks,
    isLoading: isLoadingFeedbacks,
    refetch: refetchFeedbacks,
  } = useGetFeedbacksByOrganisation(organisation.id);
  const {mutate: rateOrganisation} = useAddOrUpdateRating();
  const {
    data: similarActivities,
    isLoading: isLoadingActivities,
    error: errorActivities = [],
  } = useGetOrganizationActivities({
    filters: {
      title: '',
      type: '',
      date: '',
      country: '',
      city: '',
    },
  });

  const handleFeedbackSubmit = () => {
    rateOrganisation(
      {orgId: organisation.id, rating},
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
            {
              idOfOrganisation: organisation.id,
              rate: rating,
              feedbackDescription: feedback,
            },
            {
              onSuccess: () => {
                toast({
                  title: 'Feedback submitted.',
                  description: 'Your feedback has been successfully submitted.',
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                });
                refetchFeedbacks(); // Refetch feedbacks after submitting
              },
              onError: error => {
                toast({
                  title: 'Error submitting feedback.',
                  description:
                    error?.message ||
                    'Unable to submit feedback. Please try again later.',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                });
              },
            }
          );
        },
        onError: error => {
          toast({
            title: 'Error submitting rating.',
            description:
              error?.message ||
              'Unable to submit rating. Please try again later.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
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
        <Flex direction={{base: 'column', md: 'row'}} gap={6}>
          {/* Organization Image */}
          <Image
            src={organisation.avatarUrl || NoImage}
            alt="Organization Image"
            borderRadius="md"
            maxW={{base: '100%', md: '60%'}}
          />

          {/* Description Box */}
          <Box p={6} borderRadius="md" flex="1">
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
              <strong>Number of Reviews:</strong> {feedbacks?.length}
            </Text>
            <Text fontSize="lg" mb={4}>
              <strong>Rating:</strong>{' '}
              {organisation.rating?.toFixed(1) || (4.5).toFixed(1)}
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
                orientation="horizontal"
                style={{maxWidth: 100}}
                value={rating}
                onChange={value => setRating(value)}
                itemStyles={{
                  itemShapes: Star,
                  activeFillColor: 'orange',
                  inactiveFillColor: 'gray',
                }}
              />
              <Textarea
                mt={4}
                placeholder="Text for feedback"
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="primary" mr={3} onClick={handleFeedbackSubmit}>
                Submit
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Divider />

        {isLoadingFeedbacks ? (
          'Loading feedbacks...'
        ) : (
          <>
            <TestimonialCarousel feedbacks={feedbacks} />
            <Button variant="link" onClick={onAllFeedbacksOpen} mt={4}>
              See All Feedbacks
            </Button>
          </>
        )}

        <Divider />

        {/*/!* Slider Section *!/*/}
        {/*<SimilarListings*/}
        {/*  activities={similarActivities}*/}
        {/*  isLoading={isLoadingActivities}*/}
        {/*  error={errorActivities}*/}
        {/*/>*/}
      </VStack>

      {/* All Feedbacks Modal */}
      <Modal
        isOpen={isAllFeedbacksOpen}
        onClose={onAllFeedbacksClose}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>All Feedbacks</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              {feedbacks?.map((feedback, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                  <Flex alignItems="center" mb={2}>
                    <Image
                      src={feedback.avatarUrl || NoImage}
                      alt={feedback.realNameOfUser || feedback.username}
                      rounded="full"
                      boxSize="44px"
                      objectFit="cover"
                      mr={4}
                    />
                    <Box>
                      <Text fontWeight="bold">
                        {feedback.realNameOfUser || feedback.username}
                      </Text>
                      <Rating
                        value={feedback.rate}
                        readOnly
                        itemStyles={{
                          itemShapes: Star,
                          activeFillColor: 'orange',
                          inactiveFillColor: 'gray',
                        }}
                        style={{maxWidth: 100}}
                      />
                    </Box>
                  </Flex>
                  <Text>{feedback.description}</Text>
                </Box>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onAllFeedbacksClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default OrganizationDetailsPage;
