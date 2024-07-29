import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useQuery} from '@tanstack/react-query';
import {
  QUERY_KEY_GET_FILTERED_ACTIVITIES,
  QUERY_KEY_GET_VOLUNTEER_PROFILE,
} from '../../../utils/constants/reactQueryKeys.ts';

export const useGetVolunteerProfile = () => {
  const {volunteerService} = useServiceContext();



  const query = useQuery({
    queryKey: [QUERY_KEY_GET_VOLUNTEER_PROFILE],
    queryFn: () => {
      return volunteerService.getVolunteerProfile();
  }});

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error?.message,
    refetch: query.refetch,
  };
};
