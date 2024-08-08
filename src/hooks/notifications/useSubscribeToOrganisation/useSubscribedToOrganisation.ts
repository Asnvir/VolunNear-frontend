import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useMutation} from '@tanstack/react-query';
import {
  MUTATION_KEY_SUBSCRIBE_TO_ORGANISATION
} from '../../../utils/constants/reactQueryKeys.ts';


export const useSubscribedToOrganisation = () => {
  const {notificationService} = useServiceContext();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEY_SUBSCRIBE_TO_ORGANISATION],
    mutationFn: (organisationId: string) => {
      console.log('organisationId', organisationId);
      return notificationService.subscribeToNotifications(organisationId);
    }
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isLoading,
    error: mutation.error?.message,
  };
};
