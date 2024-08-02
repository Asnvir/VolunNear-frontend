
import { useServiceContext } from '../../../shared/hooks/useServiceContext.ts';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY_IS_JOIN_ACTIVITY} from '../../../utils/constants/reactQueryKeys.ts';

export const useVolunteerActivityJoined = (activityId: string) => {
  const { volunteerService } = useServiceContext();

  console.log("Inside useVolunteerActivityJoined", activityId);
  return useQuery({
    queryKey: [QUERY_KEY_IS_JOIN_ACTIVITY, activityId],
    queryFn: () => volunteerService.isVolunteerActivityJoined(activityId),
  });
};
