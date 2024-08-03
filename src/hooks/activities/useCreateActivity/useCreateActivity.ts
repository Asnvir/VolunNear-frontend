import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useMutation} from '@tanstack/react-query';
import {
  MUTATION_KEY_CREATE_ACTIVITY
} from '../../../utils/constants/reactQueryKeys.ts';
import {CreateActivityRequest} from '../../../api/types.ts';

export const useCreateActivity = () => {
  const {activitiesService} = useServiceContext();
  const {fileUploadService} = useServiceContext();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEY_CREATE_ACTIVITY],
    mutationFn: async (activityRequest: CreateActivityRequest) => {
      console.log('activityRequest', activityRequest);
      const activity = await activitiesService.createActivity(activityRequest);
      console.log('activity', activity);

      const { coverImage, galleryImages } = activityRequest;

      // Log the coverImage and galleryImages
      console.log('coverImage', coverImage);
      console.log('galleryImages', galleryImages);

      if (coverImage) {
        const coverFormData = new FormData();
        coverFormData.append('file', coverImage);
        console.log('coverFormData', coverFormData.get('file'));
        await fileUploadService.uploadActivityCoverImage(coverFormData, activity.id).catch((error) => {
          activitiesService.deleteActivity(activity.id);
          console.log("Deleting activity")
          throw error;
        })
      }

      if (galleryImages && galleryImages.length > 0) {
        const galleryFormData = new FormData();
        galleryImages.forEach((galleryImage) => {
          galleryFormData.append('files', galleryImage);
        });
        console.log('galleryFormData', galleryFormData.getAll('files'));
        await fileUploadService.uploadActivityGalleryImages(galleryFormData, activity.id).catch((error) => {
          console.log("Deleting activity")
          activitiesService.deleteActivity(activity.id);
          throw error;
        });
      }

      return activity;
    },
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isLoading,
    error: mutation.error?.message,
  };
};
