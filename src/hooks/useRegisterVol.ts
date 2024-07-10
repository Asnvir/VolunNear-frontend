import {useServiceContext} from '../shared/hooks/useServiceContext.ts';
import {useMutation} from '@tanstack/react-query';
import {FormValues} from '../validation/RegistrationVolValidation.ts';

export type RegisterVolCredentials = FormValues;

type UseRegisterVolProps = {
  onSuccess?: () => void;
};

export const useRegisterVol = ({onSuccess}: UseRegisterVolProps) => {
  const {authService} = useServiceContext();

  const mutation = useMutation({
    mutationFn: (registerCredentials: RegisterVolCredentials) =>
      authService.registerVolunteer(registerCredentials),
    onSuccess: () => onSuccess?.(),
  });

  const registerVol = (registerCredentials: RegisterVolCredentials) =>
    mutation.mutate(registerCredentials);

  return {
    registerVol,
    isLoading: mutation.isPending,
    error: mutation.error?.message,
  };
};
