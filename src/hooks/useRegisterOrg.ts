import {useServiceContext} from '../shared/hooks/useServiceContext.ts';
import {useMutation} from '@tanstack/react-query';
import {IRegistrationOrganisationRequestDTO} from '../data-contracts.ts';

type UseRegisterOrgProps = {
  onSuccess?: () => void;
};

export const useRegisterOrg = ({onSuccess}: UseRegisterOrgProps) => {
  const {authService} = useServiceContext();

  const mutation = useMutation({
    mutationFn: (
      registrationOrganizationDTO: IRegistrationOrganisationRequestDTO
    ) => authService.registerOrganisation(registrationOrganizationDTO),
    onSuccess: () => onSuccess?.(),
  });
  const registerOrg = (
    registrationOrganizationDTO: IRegistrationOrganisationRequestDTO
  ) => mutation.mutate(registrationOrganizationDTO);

  return {
    registerOrg,
    isLoading: mutation.isPending,
    error: mutation.error?.message,
  };
};
