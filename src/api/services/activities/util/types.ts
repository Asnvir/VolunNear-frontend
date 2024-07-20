import {ActivitiesFiltersType} from '../service/types.ts';

export type ActivityUtil = {
  filterEmptyFilters: (
    filters: ActivitiesFiltersType
  ) => Partial<ActivitiesFiltersType>;
};
