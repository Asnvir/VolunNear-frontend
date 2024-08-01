import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY_GET_FILTERED_ACTIVITIES} from '../../../utils/constants/reactQueryKeys.ts';
import {useGeolocated} from 'react-geolocated';
import {useActivitiesFiltersContext} from '../../../shared/hooks/useActivitiesFiltersContext.ts';
import {UseGetActivitiesProps} from './types.ts';

export const useGetActivities = ({isMyActivities}: UseGetActivitiesProps) => {
  const {activitiesService} = useServiceContext();
  const {filters} = useActivitiesFiltersContext();

  const {coords, isGeolocationAvailable, isGeolocationEnabled, positionError} =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
      watchLocationPermissionChange: true,
    });

  const query = useQuery({
    queryKey: [QUERY_KEY_GET_FILTERED_ACTIVITIES, filters, coords],
    queryFn: () => {
      if (coords) {
        return activitiesService.getActivities({
          ...filters,
          isMyActivities,
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
    error: query.error?.message,
    refetch: query.refetch,
    isGeolocationAvailable,
    isGeolocationEnabled,
    positionError,
  };
};
