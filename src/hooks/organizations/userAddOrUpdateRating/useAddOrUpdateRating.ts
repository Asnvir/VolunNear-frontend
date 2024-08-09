import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useMutation} from '@tanstack/react-query';
import {
  MUTATION_KEY_RATE_ORGANISATION,
} from '../../../utils/constants/reactQueryKeys.ts';
import {RateOrgParams} from './types.ts';
import {useToast} from '@chakra-ui/react';


export const useAddOrUpdateRating = () => {
  const {organizationService} = useServiceContext();
  const toast = useToast(); // Initialize toast notifications
  const mutation = useMutation({
    mutationKey: [MUTATION_KEY_RATE_ORGANISATION],
    mutationFn: (rateOrgParams: RateOrgParams) => {
      return organizationService.addOrUpdateRating(rateOrgParams.orgId, rateOrgParams.rating);
    },
    onSuccess: (data) => {
      // Handle successful mutation (e.g., show a success message)
      toast({
        title: 'Rating submitted.',
        description: 'Your rating has been successfully submitted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      // Handle mutation error (e.g., show an error message)
      toast({
        title: 'An error occurred.',
        description: error?.message || 'Unable to submit rating. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isLoading,
    error: mutation.error?.message,
  };
};
