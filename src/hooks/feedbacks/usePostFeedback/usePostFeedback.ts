import { useServiceContext } from '../../../shared/hooks/useServiceContext.ts';
import { useMutation } from '@tanstack/react-query';
import {MUTATION_KEY_POST_FEEDBACK} from '../../../utils/constants/reactQueryKeys.ts';
import { useToast } from '@chakra-ui/react';
import { IFeedbackRequest } from '../../../data-contracts.ts';

export const usePostFeedback = () => {
  const { feedbackService } = useServiceContext();
  const toast = useToast();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEY_POST_FEEDBACK],
    mutationFn: (feedbackRequest: IFeedbackRequest) => {
      return feedbackService.postFeedback(feedbackRequest);
    },
    onSuccess: (data) => {
      toast({
        title: 'Feedback submitted successfully!',
        description: 'Thank you for providing your feedback.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right', // Change toast position if desired
      });

      // Additional logic after success (e.g., reset form, navigate, etc.)
    },
    onError: (error: any) => {
      // Log the error for debugging
      console.error('Feedback submission error:', error);

      // Show error toast notification
      toast({
        title: 'Submission Failed',
        description: error?.message || 'There was a problem submitting your feedback. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right', // Change toast position if desired
      });

      // Additional error handling (e.g., report error, retry logic, etc.)
    },
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isLoading,
    error: mutation.error?.message,
  };
};
