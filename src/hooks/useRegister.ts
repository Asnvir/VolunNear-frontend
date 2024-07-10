import {useServiceContext} from '../shared/hooks/useServiceContext.ts';
import {
  IRegistrationOrganisationRequestDTO,
  IRegistrationVolunteerRequestDTO,
} from '../data-contracts.ts';
import {useMutation} from '@tanstack/react-query';

export const useRegister = () => {
  const {authService} = useServiceContext();

  const mutationRegistrationOrg = useMutation({
    mutationFn: (
      registrationOrganizationDTO: IRegistrationOrganisationRequestDTO
    ) => authService.registerOrganisation(registrationOrganizationDTO),
  });

  const registerOrg = (
    registrationOrganizationDTO: IRegistrationOrganisationRequestDTO
  ) => mutationRegistrationOrg.mutate(registrationOrganizationDTO);

  const mutationRegistrationVol = useMutation({
    mutationFn: (registrationVolunteerDTO: IRegistrationVolunteerRequestDTO) =>
      authService.registerVolunteer(registrationVolunteerDTO),
  });

  const registerVol = (
    registrationVolunteerDTO: IRegistrationVolunteerRequestDTO
  ) => mutationRegistrationVol.mutate(registrationVolunteerDTO);

  return {registerOrg, registerVol};
};
