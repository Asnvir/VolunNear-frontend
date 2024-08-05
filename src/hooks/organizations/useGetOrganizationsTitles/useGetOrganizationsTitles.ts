import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {OrganizationFiltersType} from '../../../api/services/organizations/types.ts';
import {useQuery} from '@tanstack/react-query';

export type UseGetOrganizationsTitlesProps = {
  filters: OrganizationFiltersType;
};

export const useGetOrganizationsTitles = ({
  filters,
}: UseGetOrganizationsTitlesProps) => {
  const {organizationService} = useServiceContext();

  const query = useQuery({
    queryKey: ['QUERY_KEY_GET_ORGANIZATIONS_TITLES', filters],
    queryFn: () => {
      return organizationService.getOrganizationsTitles(filters);
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error?.message,
  };
};
