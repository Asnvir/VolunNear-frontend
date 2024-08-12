import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useQuery} from '@tanstack/react-query';
import {
  QUERY_GET_AVERAGE_RATING_OF_ORGANISATION,
} from '../../../utils/constants/reactQueryKeys.ts';

export const useGetAverageRating = (orgId: string) => {
  const {organizationService} = useServiceContext();


  const query = useQuery({
      queryKey: [QUERY_GET_AVERAGE_RATING_OF_ORGANISATION, orgId],
      queryFn: () => {
        return organizationService.getAverageRating(orgId);
      },
    enabled: !!orgId,
    },
  );

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error?.message,
    refetch: query.refetch,
  };
};
