import {VolunteerActivitiesFiltersType} from '../../services/activities/service/types.ts';
import {ActivitiesFiltersRequest} from '../../services/http/types.ts';
import {IUpdateVolunteerInfoRequestDTO} from '../../../data-contracts.ts';
import {UpdateVolunteerInfo} from '../../services/volunteer/types.ts';
import {ActivitiesFiltersRequest} from '../../httpClient/types.ts';

export type VolunteerMapper = {
  preferencesToDTO(
    filters: VolunteerActivitiesFiltersType
  ): ActivitiesFiltersRequest;
  updateVolunteerInfoToDTO(
    updateVolunteerInfo: UpdateVolunteerInfo
  ): IUpdateVolunteerInfoRequestDTO;
};
