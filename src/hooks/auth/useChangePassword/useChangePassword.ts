import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useMutation} from '@tanstack/react-query';
import {
  MUTATION_KEY_CHANGE_PASSWORD,
} from '../../../utils/constants/reactQueryKeys.ts';
import {ChangePasswordParams} from './types.ts';

export const useChangePassword = () => {
  const {authService} = useServiceContext();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEY_CHANGE_PASSWORD],
    mutationFn: (changePasswordParams: ChangePasswordParams) => {
      console.log('changePasswordParams', changePasswordParams);
      return authService.changePassword(changePasswordParams.oldPassword, changePasswordParams.newPassword);
    },
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isLoading,
    error: mutation.error?.message,
  };
};
