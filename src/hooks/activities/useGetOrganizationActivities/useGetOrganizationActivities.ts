import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY_GET_ORGANISATION__ACTIVITIES} from '../../../utils/constants/reactQueryKeys.ts';
import {useGeolocated} from 'react-geolocated';
import {OrganisationActivitiesFiltersType} from '../../../api/services/activities/service/types.ts';

type UseGetOrganizationActivitiesProps = {
  filters: OrganisationActivitiesFiltersType;
};

export const useGetOrganizationActivities = ({
  filters,
}: UseGetOrganizationActivitiesProps) => {
  const {activitiesService} = useServiceContext();

  const {coords, isGeolocationAvailable, isGeolocationEnabled, positionError} =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
      watchLocationPermissionChange: true,
    });

  const query = useQuery({
    queryKey: [QUERY_KEY_GET_ORGANISATION__ACTIVITIES, filters, coords],
    queryFn: () => {
      if (coords) {
        return activitiesService.getOrganisationActivities({
          ...filters,
          sortOrder: 'ASC',
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      }
      return [];
    },
    enabled: isGeolocationAvailable && isGeolocationEnabled && !!coords,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    isGeolocationAvailable,
    isGeolocationEnabled,
    positionError,
  };
};
