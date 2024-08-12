import {VolunteerActivitiesFiltersType} from '../../../api/services/activities/service/types.ts';

export type ActivitiesFilterProps = {
  onApply: (filters: VolunteerActivitiesFiltersType) => void;
};
