import {
  ActivitiesFiltersType,
  BackendActivitiesFiltersType,
} from '../service/types.ts';

export type ActivityUtil = {
  filterEmptyFilters: (
    filters: BackendActivitiesFiltersType
  ) => Partial<ActivitiesFiltersType>;
};
