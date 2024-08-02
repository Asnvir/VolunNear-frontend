import {ActivitiesFiltersType} from '../../../api/services/activities/service/types';

export type ActivitiesListProps = {
  isMyActivities: boolean;
  filters: ActivitiesFiltersType;
};
