import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {MUTATION_KEY_LEAVE_ACTIVITY} from '../../../utils/constants/reactQueryKeys.ts';

type UseLeaveActivityArgs = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

type UseLeaveActivityReturn = {
  mutate: (activityId: string) => void;
  data: unknown;
  isLoading: boolean;
  error: string | null;
};

export const useLeaveActivity = ({
  onSuccess,
  onError,
}: UseLeaveActivityArgs): UseLeaveActivityReturn => {
  const {activitiesService} = useServiceContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEY_LEAVE_ACTIVITY],
    mutationFn: (activityId: string) => {
      return activitiesService.removeVolunteerFromActivity(activityId);
    },
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries();
        onSuccess?.();
      } catch (error) {
        onError?.(error);
      }
    },
    onError: error => onError?.(error),
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
};
