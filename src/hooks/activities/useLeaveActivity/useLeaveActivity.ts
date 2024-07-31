import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  MUTATION_KEY_ADD_VOLUNTEER_TO_ACTIVITY, MUTATION_KEY_LEAVE_ACTIVITY,
  MUTATION_KEY_UPLOAD_VOLUNTEER_AVATAR,
} from '../../../utils/constants/reactQueryKeys.ts';
import {UploadAvatarParams} from '../../volunteer/useUpdateVolunteerProfile/types.ts';

export const useLeaveActivity = () => {
  const {activitiesService} = useServiceContext();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEY_LEAVE_ACTIVITY],
    mutationFn: (activityId: string) => {
      console.log('activityId', activityId);
      return activitiesService.removeVolunteerFromActivity(activityId);
    },
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isLoading,
    error: mutation.error?.message,
  };
};
