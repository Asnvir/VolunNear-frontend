import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {MUTATION_KEY_LEAVE_ACTIVITY, QUERY_KEY_IS_JOIN_ACTIVITY,
} from '../../../utils/constants/reactQueryKeys.ts';

export const useLeaveActivity = () => {
  const {activitiesService} = useServiceContext();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: [MUTATION_KEY_LEAVE_ACTIVITY],
    mutationFn: (activityId: string) => {
      console.log('activityId', activityId);
      return activitiesService.removeVolunteerFromActivity(activityId);
    }, onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY_IS_JOIN_ACTIVITY]);
    }
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isLoading,
    error: mutation.error?.message,
  };
};
