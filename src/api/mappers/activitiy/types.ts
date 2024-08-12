import {
  Activity,
  ActivityDTO,
  CreateActivityRequest,
  OrganisationDTO,
} from '../../types.ts';
import {
  VolunteerActivitiesFiltersType,
  ActivitiesTitles,
  BackendActivitiesFiltersType,
} from '../../services/activities/service/types.ts';
import {
  ActivitiesFiltersRequest,
  ActivitiesFiltersResponse,
  ActivitiesTitlesResponse,
} from '../../httpClient/types.ts';
import {IAddActivityRequestDTO} from '../../../data-contracts.ts';

export type ActivityMapper = {
  fromDTO({
    activity,
    organization,
  }: {
    activity: ActivityDTO;
    organization: OrganisationDTO;
  }): Activity;

  toDto(activity: CreateActivityRequest): IAddActivityRequestDTO;

  filtersToDTO(
    filters: VolunteerActivitiesFiltersType
  ): ActivitiesFiltersRequest;

  DTOtoFilters(
    filtersDTO: ActivitiesFiltersResponse
  ): VolunteerActivitiesFiltersType;
  DTOtoTitles(titlesDTO: ActivitiesTitlesResponse): ActivitiesTitles;

  mapFrontendToBackendFilters: (
    filters: VolunteerActivitiesFiltersType,
    isOrganisation: boolean
  ) => BackendActivitiesFiltersType;

  convertToQueryParams: (
    backendFilters: Partial<BackendActivitiesFiltersType>
  ) => Record<string, string>;
};
