import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useQuery} from '@tanstack/react-query';
import {
  QUERY_KEY_GET_ORGANISATION_PROFILE,
} from '../../../utils/constants/reactQueryKeys.ts';

export const useGetOrganizationProfile = () => {
  const {organizationService} = useServiceContext();



  const query = useQuery({
    queryKey: [QUERY_KEY_GET_ORGANISATION_PROFILE],
    queryFn: () => {
      return organizationService.getOrganisationProfile();
    }});

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error?.message,
    refetch: query.refetch,
  };
};
