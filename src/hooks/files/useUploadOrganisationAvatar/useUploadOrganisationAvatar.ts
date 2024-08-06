import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useMutation} from '@tanstack/react-query';
import {
  MUTATION_KEY_UPLOAD_VOLUNTEER_AVATAR,
} from '../../../utils/constants/reactQueryKeys.ts';
import {UploadAvatarParams} from '../../volunteer/useUpdateVolunteerProfile/types.ts';

export const useUploadOrganisationAvatar = () => {
  const {fileUploadService} = useServiceContext();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEY_UPLOAD_VOLUNTEER_AVATAR],
    mutationFn: (uploadAvatarParams: UploadAvatarParams) => {
      console.log('uploadAvatarParams', uploadAvatarParams);
      return fileUploadService.uploadOrganisationAvatar(uploadAvatarParams.formData, uploadAvatarParams.id);
    },
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isLoading,
    error: mutation.error?.message,
  };
};
