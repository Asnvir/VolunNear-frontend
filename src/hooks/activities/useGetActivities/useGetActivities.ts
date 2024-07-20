import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY_GET_FILTERED_ACTIVITIES} from '../../../utils/constants/reactQueryKeys.ts';
import {useActivitiesContext} from '../../../shared/hooks/useActivitiesContext.ts';

export const useGetActivities = () => {
  const {activitiesService} = useServiceContext();
  const {filters} = useActivitiesContext();

  const query = useQuery({
    queryKey: [QUERY_KEY_GET_FILTERED_ACTIVITIES, filters],
    queryFn: () => activitiesService.getActivities(filters),
  });

  return {
    activities: query.data,
    isLoading: query.isLoading,
    error: query.error?.message,
    refetch: query.refetch,
  };
};
