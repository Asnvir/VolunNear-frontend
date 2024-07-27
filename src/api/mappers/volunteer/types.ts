import {ActivitiesFiltersType} from '../../services/activities/service/types.ts';
import {ActivitiesFiltersRequest} from '../../services/http/types.ts';

export type VolunteerMapper = {
  preferencesToDTO(filters: ActivitiesFiltersType): ActivitiesFiltersRequest;
};
