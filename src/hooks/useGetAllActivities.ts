import {useServiceContext} from '../shared/hooks/useServiceContext.ts';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY_GET_ALL_ACTIVITIES} from '../utils/constants/reactQueryKeys.ts';
import {Activity} from '../api/types.ts';

export const useGetAllActivities = () => {
  const {activitiesService} = useServiceContext();

  const {
    data: activities,
    isLoading,
    error,
    refetch,
  } = useQuery<Activity[]>({
    queryKey: [QUERY_KEY_GET_ALL_ACTIVITIES],
    queryFn: activitiesService.getActivities.bind(activitiesService),
  });

  return {
    activities,
    isLoading,
    error: error?.message,
    refetch,
  };
};
