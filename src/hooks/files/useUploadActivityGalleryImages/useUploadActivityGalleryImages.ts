import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useMutation} from '@tanstack/react-query';
import {MUTATION_KEY_UPLOAD_ACTIVITY_GALLERY_IMAGES,
} from '../../../utils/constants/reactQueryKeys.ts';
import {UploadImageParams} from '../useUploadActivityCoverImage/types.ts';


export const useUploadActivityGalleryImages = () => {
  const {fileUploadService} = useServiceContext();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEY_UPLOAD_ACTIVITY_GALLERY_IMAGES],
    mutationFn: (uploadImagesParams: UploadImageParams) => {
      console.log('uploadImageParams', uploadImagesParams);
      return fileUploadService.uploadVolunteerAvatar(uploadImagesParams.formData, uploadImagesParams.activityId);
    },
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isLoading,
    error: mutation.error?.message,
  };
};
