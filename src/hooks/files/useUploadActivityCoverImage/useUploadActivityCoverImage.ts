import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useMutation} from '@tanstack/react-query';
import {
  MUTATION_KEY_UPLOAD_ACTIVITY_COVER_IMAGE,
} from '../../../utils/constants/reactQueryKeys.ts';
import {UploadImageParams} from './types.ts';

export const useUploadActivityCoverImage = () => {
  const {fileUploadService} = useServiceContext();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEY_UPLOAD_ACTIVITY_COVER_IMAGE],
    mutationFn: (uploadImageParams: UploadImageParams) => {
      console.log('uploadAvatarParams', uploadImageParams);
      return fileUploadService.uploadVolunteerAvatar(uploadImageParams.formData, uploadImageParams.activityId);
    },
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isLoading,
    error: mutation.error?.message,
  };
};
