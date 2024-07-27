import {ActivitiesFiltersType} from '../../services/activities/service/types.ts';
import {ActivitiesFiltersRequest} from '../../services/http/types.ts';
import {IUpdateVolunteerInfoRequestDTO} from '../../../data-contracts.ts';
import {UpdateVolunteerInfo} from '../../services/volunteer/types.ts';

export type VolunteerMapper = {
  preferencesToDTO(filters: ActivitiesFiltersType): ActivitiesFiltersRequest;
  updateVolunteerInfoToDTO(updateVolunteerInfo: UpdateVolunteerInfo): IUpdateVolunteerInfoRequestDTO;
};
