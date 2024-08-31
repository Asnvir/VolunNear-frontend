import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {MUTATION_KEY_ADD_VOLUNTEER_TO_ACTIVITY} from '../../../utils/constants/reactQueryKeys.ts';

type UseJoinToActivityArgs = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export const useJoinToActivity = ({
  onSuccess,
  onError,
}: UseJoinToActivityArgs) => {
  const {activitiesService} = useServiceContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEY_ADD_VOLUNTEER_TO_ACTIVITY],
    mutationFn: (activityId: string) => {
      return activitiesService.addVolunteerToActivity(activityId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries().then(() => onSuccess?.());
    },
    onError: error => onError?.(error),
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isPending,
    error:
      mutation.error instanceof Error
        ? mutation.error.message
        : String(mutation.error),
  };
};
