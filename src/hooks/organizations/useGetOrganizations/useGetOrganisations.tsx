import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useQuery} from '@tanstack/react-query';
import {UseGetOrganizationsTitlesProps} from '../useGetOrganizationsTitles/useGetOrganizationsTitles.ts';

export const useGetOrganisations = ({
  filters,
}: UseGetOrganizationsTitlesProps) => {
  const {organizationService} = useServiceContext();

  const query = useQuery({
    queryKey: ['QUERY_KEY_GET_ORGANIZATIONS', filters],
    queryFn: () => {
      return organizationService.getOrganizations(filters);
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error?.message,
  };
};
