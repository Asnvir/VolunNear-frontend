import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useMutation} from '@tanstack/react-query';
import {
  MUTATION_KEY_UPDATE_ORGANISATION_PROFILE,
} from '../../../utils/constants/reactQueryKeys.ts';
import {IOrganisationInfoDTO} from '../../../data-contracts.ts';


export const useUpdateOrganizationProfile = () => {
  const {organizationService} = useServiceContext();

  //TODO: Implement checker validation for the mutation
  const mutation  = useMutation({
    mutationKey: [MUTATION_KEY_UPDATE_ORGANISATION_PROFILE],
    mutationFn: (updatedProfileData: IOrganisationInfoDTO) => {
      return organizationService.updateOrganisationInfo(updatedProfileData);
    },
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isLoading,
    error: mutation.error?.message,
  };
};
