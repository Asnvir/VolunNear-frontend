// useChangePassword.ts
import {useMutation} from '@tanstack/react-query';
import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {ChangePasswordRequest} from '../../../api/httpClient/types.ts';
import {MUTATION_KEY_CHANGE_PASSWORD} from '../../../utils/constants/reactQueryKeys.ts';

export const useChangeForgottedPassword = (
  onSuccess: () => void,
  onError: (errorMessage: string) => void
) => {
  const {authService} = useServiceContext();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEY_CHANGE_PASSWORD],
    mutationFn: async ({
      email,
      changePassword,
    }: {
      email: string;
      changePassword: ChangePasswordRequest;
    }) => {
      return await authService.changeForgottedPassword(email, changePassword);
    },
    onSuccess: data => {
      if (data.success) {
        console.log('Password changed successfully:', data.message);
        onSuccess();
      } else {
        onError(data.message || 'Password change failed');
      }
    },
    onError: error => {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      onError(errorMessage);
    },
  });

  return {
    changePassword: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error?.message,
  };
};
