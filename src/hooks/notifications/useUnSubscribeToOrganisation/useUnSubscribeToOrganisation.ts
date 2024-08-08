import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useMutation} from '@tanstack/react-query';
import {
  MUTATION_KEY_UNSUBSCRIBE_FROM_ORGANISATION,
} from '../../../utils/constants/reactQueryKeys.ts';


export const useUnSubscribeToOrganisation = () => {
  const {notificationService} = useServiceContext();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEY_UNSUBSCRIBE_FROM_ORGANISATION],
    mutationFn: (organisationId: string) => {
      console.log('organisationId', organisationId);
      return notificationService.unsubscribeFromNotifications(organisationId);
    }
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isLoading,
    error: mutation.error?.message,
  };
};
