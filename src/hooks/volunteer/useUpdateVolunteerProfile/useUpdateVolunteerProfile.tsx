import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useMutation} from '@tanstack/react-query';
import {
  MUTATION_KEY_UPDATE_VOLUNTEER_PROFILE,
} from '../../../utils/constants/reactQueryKeys.ts';
import {UpdateVolunteerInfo} from '../../../api/services/volunteer/types.ts';

export const useUpdateVolunteerProfile = () => {
  const {volunteerService} = useServiceContext();

  const mutation  = useMutation({
    mutationKey: [MUTATION_KEY_UPDATE_VOLUNTEER_PROFILE],
    mutationFn: (updatedProfileData: UpdateVolunteerInfo) => {
      return volunteerService.updateVolunteerProfile(updatedProfileData);
    },
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isLoading,
    error: mutation.error?.message,
  };
};
