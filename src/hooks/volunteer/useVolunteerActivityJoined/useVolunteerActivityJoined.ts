import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useQuery, useQueryClient, UseQueryResult} from '@tanstack/react-query';
import {useEffect} from 'react';
import {QUERY_KEY_IS_JOIN_ACTIVITY} from '../../../utils/constants/reactQueryKeys.ts';

type UseVolunteerActivityJoinedReturn = {
  data: boolean | null;
  isLoading: boolean;
  error: string | null;
};

export const useVolunteerActivityJoined = (
  activityId: string
): UseVolunteerActivityJoinedReturn => {
  const {volunteerService} = useServiceContext();
  const queryClient = useQueryClient();

  const query: UseQueryResult<boolean, Error> = useQuery({
    queryKey: [QUERY_KEY_IS_JOIN_ACTIVITY, activityId],
    queryFn: () => volunteerService.isVolunteerActivityJoined(activityId),
  });

  useEffect(() => {
    if (query.isSuccess) {
      queryClient.invalidateQueries().then(() => {});
    }
  }, [query.isSuccess, queryClient, activityId]);

  useEffect(() => {
    if (query.isError) {
      console.error('Error during query:', query.error);
    }
  }, [query.isError, query.error]);

  return {
    data: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
  };
};
