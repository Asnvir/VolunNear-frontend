import {useServiceContext} from '../shared/hooks/useServiceContext.ts';
import useGetUserRole from './auth/useGetUserRole/useGetUserRole.ts';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY_GET_AVATAR} from '../utils/constants/reactQueryKeys.ts';


export const useGetAvatar = () => {
  const {volunteerService} = useServiceContext();
  const {organizationService} = useServiceContext();
  const userRole = useGetUserRole();



  const query = useQuery({
    queryKey: [QUERY_KEY_GET_AVATAR, userRole],
    queryFn: () => {
      if (userRole === 'ROLE_VOLUNTEER') {
        return volunteerService.getVolunteerProfile().then((result) => result.avatarUrl);
      } else {
        return organizationService.getOrganisationProfile().then((result) => result.organisationResponseDTO?.avatarUrl);
      }
    }});

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error?.message,
    refetch: query.refetch,
  };
};
