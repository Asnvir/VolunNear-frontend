import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useInfiniteQuery} from '@tanstack/react-query';
import {QUERY_KEY_GET_FILTERED_ACTIVITIES} from '../../../utils/constants/reactQueryKeys.ts';
import {useGeolocated} from 'react-geolocated';
import {UseGetActivitiesProps} from './types.ts';

// export const useGetVolunteerActivities = ({filters}: UseGetActivitiesProps) => {
//   const {activitiesService} = useServiceContext();
//
//   const {coords, isGeolocationAvailable, isGeolocationEnabled, positionError} =
//     useGeolocated({
//       positionOptions: {
//         enableHighAccuracy: false,
//       },
//       userDecisionTimeout: 5000,
//       watchLocationPermissionChange: true,
//     });
//
//   const query = useQuery({
//     queryKey: [QUERY_KEY_GET_FILTERED_ACTIVITIES, filters, coords],
//     queryFn: () => {
//       if (coords) {
//         return activitiesService.getVolunteerActivities({
//           ...filters,
//           sortOrder: 'ASC',
//           latitude: coords.latitude,
//           longitude: coords.longitude,
//         });
//       }
//       return [];
//     },
//     enabled: isGeolocationAvailable && isGeolocationEnabled && !!coords,
//   });
//
//   return {
//     data: query.data,
//     isLoading: query.isLoading,
//     error: query.error?.message,
//     refetch: query.refetch,
//     isGeolocationAvailable,
//     isGeolocationEnabled,
//     positionError,
//   };
// };

export const useGetVolunteerActivities = ({
  filters,
  size,
}: UseGetActivitiesProps) => {
  const {activitiesService} = useServiceContext();

  const {coords, isGeolocationAvailable, isGeolocationEnabled, positionError} =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
      watchLocationPermissionChange: true,
    });

  const query = useInfiniteQuery({
    queryKey: [QUERY_KEY_GET_FILTERED_ACTIVITIES, filters, coords],
    queryFn: ({pageParam = 0}) => {
      if (coords) {
        return activitiesService.getVolunteerActivities({
          ...filters,
          sortOrder: 'ASC',
          latitude: coords.latitude,
          longitude: coords.longitude,
          page: pageParam,
          size: size,
        });
      }
      return [];
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined; // No more pages to load
      return allPages.length; // next page
    },
    initialPageParam: 0, // Добавлено свойство initialPageParam
    enabled: isGeolocationAvailable && isGeolocationEnabled && !!coords,
  });

  return {
    data: query.data?.pages.flatMap(page => page) ?? [],
    isLoading: query.isLoading,
    error: query.error?.message,
    refetch: query.refetch,
    isGeolocationAvailable,
    isGeolocationEnabled,
    positionError,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
  };
};
