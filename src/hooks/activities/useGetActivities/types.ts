import {ActivitiesFiltersType} from '../../../api/services/activities/service/types.ts';

export type UseGetActivitiesProps = {
  isMyActivities: boolean;
  filters: ActivitiesFiltersType;
};
