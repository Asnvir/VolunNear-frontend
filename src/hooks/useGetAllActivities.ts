import {useEffect} from 'react';
import {useServiceContext} from '../shared/hooks/useServiceContext.ts';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY_GET_ALL_ACTIVITIES} from '../utils/constants/reactQueryKeys.ts';
import {Activity} from '../api/types.ts';

export const useGetAllActivities = () => {
  const {activitiesService} = useServiceContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (): Promise<Activity[]> =>
      activitiesService.getActivities(),
    onSuccess: data => {
      queryClient.setQueryData([QUERY_KEY_GET_ALL_ACTIVITIES], data);
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  const cachedResult = queryClient.getQueryData<Activity[]>([
    QUERY_KEY_GET_ALL_ACTIVITIES,
  ]);

  return {
    activities: cachedResult,
    isLoading: mutation.isPending,
    error: mutation.error?.message,
    refetch: mutation.mutate,
  };
};
