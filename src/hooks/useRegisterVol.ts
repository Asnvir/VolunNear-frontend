import {useServiceContext} from '../shared/hooks/useServiceContext.ts';
import {useMutation} from '@tanstack/react-query';
import {IRegistrationVolunteerRequestDTO} from '../data-contracts.ts';

type UseRegisterVolProps = {
  onSuccess?: () => void;
};

export const useRegisterVol = ({onSuccess}: UseRegisterVolProps) => {
  const {authService} = useServiceContext();

  const mutation = useMutation({
    mutationFn: (
      registrationVolunteerDTO: IRegistrationVolunteerRequestDTO
    ) => authService.registerVolunteer(registrationVolunteerDTO),
    onSuccess: () => onSuccess?.(),
  });

  const registerVol = (
    registrationVolunteerDTO: IRegistrationVolunteerRequestDTO
  ) => mutation.mutate(registrationVolunteerDTO);

  return {registerVol, isLoading: mutation.isPending, error: mutation.error?.message};
};
