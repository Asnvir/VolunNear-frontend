import {useActivitiesFiltersContext} from '../../../shared/hooks/useActivitiesFiltersContext.ts';
import {useMutation} from '@tanstack/react-query';
import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {VolunteerActivitiesFiltersType} from '../../../api/services/activities/service/types.ts';

export const useSetActivitiesFilters = () => {
  const {setFilters} = useActivitiesFiltersContext();
  const {activitiesService} = useServiceContext();

  const mutation = useMutation({
    mutationFn: (filters: VolunteerActivitiesFiltersType) =>
      activitiesService.setActivitiesFilters(filters),
    onSuccess: updatedFilters => {
      setFilters(updatedFilters);
    },
  });

  const updateFilters = (filters: VolunteerActivitiesFiltersType) => {
    mutation.mutate(filters);
  };

  return {
    updateFilters,
    isLoading: mutation.isPending,
    error: mutation.error?.message,
  };
};
