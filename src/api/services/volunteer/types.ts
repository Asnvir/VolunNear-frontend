import {ActivitiesFiltersType} from '../../../context/types.ts';

export type VolunteerService = {
  updateVolunteerPreferences(
    filters: ActivitiesFiltersType
  ): Promise<ActivitiesFiltersType>;
};
