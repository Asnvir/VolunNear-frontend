import {ActivitiesFiltersType} from '../../../api/services/activities/service/types.ts';

export type ActivitiesFilterProps = {
  onApply: (filters: ActivitiesFiltersType) => void;
};
