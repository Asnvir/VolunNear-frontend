import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useQuery} from '@tanstack/react-query';
import {
  QUERY_KEY_GET_ALL_SUBSCRIBED_ORGANISATIONS,
} from '../../../utils/constants/reactQueryKeys.ts';

export const useGetAllSubscribedOrganisation = () => {
  const {notificationService} = useServiceContext();



  const query = useQuery({
    queryKey: [QUERY_KEY_GET_ALL_SUBSCRIBED_ORGANISATIONS],
    queryFn: () => {
      return notificationService.getNotifications();
    }});

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error?.message,
    refetch: query.refetch,
  };
};
