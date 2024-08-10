import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY_GET_VOLUNTEER_ACTIVITIES_TITLES} from '../../../utils/constants/reactQueryKeys.ts';

export const useGetVolunteerActivitiesTitles = () => {
  const {activitiesService} = useServiceContext();

  const query = useQuery({
    queryKey: [QUERY_KEY_GET_VOLUNTEER_ACTIVITIES_TITLES],
    queryFn: () => {
      return activitiesService.getActivitiesTitles();
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error?.message,
    refetch: query.refetch,
  };
};
