import {useMutation} from '@tanstack/react-query';
import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {MUTATION_KEY_VERIFY_OTP} from '../../../utils/constants/reactQueryKeys.ts';

export const useVerifyOTP = (
  onOTPSuccess: (otp: string, email: string) => void,
  onError?: (errorMessage: string) => void
) => {
  const {authService} = useServiceContext();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEY_VERIFY_OTP],
    mutationFn: async ({otp, email}: {otp: string; email: string}) => {
      console.log(
        `useVerifyOTP - - Before calling verifyOTP: ${otp}, ${email}`
      );
      return await authService.verifyOTP(otp, email);
    },
    onSuccess: (data, variables) => {
      if (data.success) {
        console.log(`OTP verification successful: ${data.message}`);
        console.log(`OTP: ${variables.otp}, Email: ${variables.email}`);
        onOTPSuccess(variables.otp, variables.email); // Call onOTPSuccess with OTP and email
      } else {
        if (onError) {
          onError(data.message || 'OTP verification failed');
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
    verifyOTP: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error?.message,
  };
};
