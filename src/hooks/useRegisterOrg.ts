import {useServiceContext} from '../shared/hooks/useServiceContext.ts';
import {useMutation} from '@tanstack/react-query';
import {FormValues} from '../validation/RegistrationOrgValidation.ts';

export type RegisterOrgCredentials = FormValues;

type UseRegisterOrgProps = {
  onSuccess?: () => void;
};

export const useRegisterOrg = ({onSuccess}: UseRegisterOrgProps) => {
  const {authService} = useServiceContext();

  const mutation = useMutation({
    mutationFn: (registerCredentials: RegisterOrgCredentials) =>
      authService.registerOrganisation(registerCredentials),
    onSuccess: () => onSuccess?.(),
  });

  const registerOrg = (registerCredentials: RegisterOrgCredentials) =>
    mutation.mutate(registerCredentials);

  return {
    registerOrg,
    isLoading: mutation.isPending,
    error: mutation.error?.message,
  };
};
