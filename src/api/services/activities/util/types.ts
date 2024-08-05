import {BackendActivitiesFiltersType} from '../service/types.ts';

export type ActivityUtil = {
  filterEmptyFilters: (
    filters: BackendActivitiesFiltersType
  ) => Partial<BackendActivitiesFiltersType>;
};
