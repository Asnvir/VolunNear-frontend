import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY_GET_VOLUNTEER_ACTIVITIES_TYPES} from '../../../utils/constants/reactQueryKeys.ts';

export const useGetVolunteerActivitiesTypes = () => {
  const {activitiesService} = useServiceContext();

  const query = useQuery({
    queryKey: [QUERY_KEY_GET_VOLUNTEER_ACTIVITIES_TYPES],
    queryFn: () => {
      return activitiesService.getActivitiesTypes();
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error?.message,
    refetch: query.refetch,
  };
};
