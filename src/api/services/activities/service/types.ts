import {Activity} from '../../../types.ts';

export type ActivitiesService = {
  getActivities(queryParams?: ActivitiesFiltersType): Promise<Activity[]>;
  setActivitiesFilters: (
    filters: ActivitiesFiltersType
  ) => Promise<ActivitiesFiltersType>;
};

export type ActivitiesFiltersType = {
  title?: string;
  date?: string;
  type?: string;
  city?: string;
  country?: string;
};

export type ActivitiesFiltersDTO = {
  preferences: string[];
};
