import {useActivitiesContext} from '../../../shared/hooks/useActivitiesContext.ts';
import {useMutation} from '@tanstack/react-query';
import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {ActivitiesFiltersType} from '../../../api/services/activities/service/types.ts';

export const useSetActivitiesFilters = () => {
  const {setFilters} = useActivitiesContext();
  const {activitiesService} = useServiceContext();

  const mutation = useMutation({
    mutationFn: (filters: ActivitiesFiltersType) =>
      activitiesService.setActivitiesFilters(filters),
    onSuccess: updatedFilters => {
      setFilters(updatedFilters);
    },
  });

  const updateFilters = (filters: ActivitiesFiltersType) => {
    mutation.mutate(filters);
  };

  return {
    updateFilters,
    isLoading: mutation.isPending,
    error: mutation.error?.message,
  };
};
