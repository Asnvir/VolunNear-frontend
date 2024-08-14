import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY_GET_FEEDBACKS} from '../../../utils/constants/reactQueryKeys.ts';


export const useGetFeedbacksByOrganisation = (orgId: string) => {
  const {feedbackService} = useServiceContext();



  const query = useQuery({
    queryKey: [QUERY_KEY_GET_FEEDBACKS, orgId],
    queryFn: () => {
      return feedbackService.getAllFeedbacks(orgId);
    }});

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error?.message,
    refetch: query.refetch,
  };
};
