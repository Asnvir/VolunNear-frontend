import {Activity, ActivityDTO, OrganisationDTO} from '../../types.ts';
import {ActivitiesFiltersType} from '../../services/activities/service/types.ts';
import {ActivitiesFiltersDTO} from '../volunteer/types.ts';

export type ActivityMapper = {
  fromDTO({
    activity,
    organization,
  }: {
    activity: ActivityDTO;
    organization: OrganisationDTO;
  }): Activity;

  preferencesToDTO(filters: ActivitiesFiltersType): ActivitiesFiltersDTO;

  DTOToPreferences(dto: ActivitiesFiltersDTO): ActivitiesFiltersType;
};
