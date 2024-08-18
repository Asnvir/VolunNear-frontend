import {useMutation} from '@tanstack/react-query';
import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {MUTATION_KEY_VERIFY_EMAIL} from '../../../utils/constants/reactQueryKeys.ts';

export const useVerifyEmail = (
  onEmailSent: (email: string) => void,
  onError?: (errorMessage: string) => void
) => {
  const {authService} = useServiceContext();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEY_VERIFY_EMAIL],
    mutationFn: async (email: string) => {
      return await authService.verifyEmail(email);
    },
    onSuccess: (data, variables) => {
      if (data.success) {
        console.log(`Email verification successful: ${data.message}`);
        console.log(`Email: ${variables}`);
        onEmailSent(variables); // Call onEmailSent with the email
      } else {
        if (onError) {
          onError(data.message || 'Email verification failed');
        }
      }
    },
    onError: error => {
      if (onError) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error occurred';
        onError(errorMessage);
      }
    },
  });

  return {
    verifyEmail: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error?.message,
  };
};
