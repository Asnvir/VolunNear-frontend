import {useInfiniteQuery} from '@tanstack/react-query';
import {VolunteerActivitiesFiltersType} from '../../../api/services/activities/service/types.ts';

const fetchActivities = async ({
  pageParam = 0,
  filters,
}: {
  pageParam?: number;
  filters: VolunteerActivitiesFiltersType;
}) => {
  const response = await fetch(`/api/activities?cursor=${pageParam}`, {
    method: 'POST',
    body: JSON.stringify(filters),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const useInfiniteVolunteerActivities = (
  filters: VolunteerActivitiesFiltersType
) => {
  return useInfiniteQuery({
    queryKey: ['volunteerActivities', filters],
    queryFn: ({pageParam}) => fetchActivities({pageParam, filters}),
    getNextPageParam: lastPage => lastPage.nextCursor,
    initialPageParam: 0, // Добавлено свойство initialPageParam
  });
};
