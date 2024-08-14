import { useServiceContext } from '../../../shared/hooks/useServiceContext.ts';
import { useMutation } from '@tanstack/react-query';
import {MUTATION_KEY_POST_FEEDBACK} from '../../../utils/constants/reactQueryKeys.ts';
import { IFeedbackRequest } from '../../../data-contracts.ts';

export const usePostFeedback = () => {
  const { feedbackService } = useServiceContext();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEY_POST_FEEDBACK],
    mutationFn: (feedbackRequest: IFeedbackRequest) => {
      console.log(`feedbackRequest:` ,feedbackRequest);
      return feedbackService.postFeedback(feedbackRequest);
    },
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isLoading,
    error: mutation.error?.message,
  };
};
