import {
  Activity,
  ActivityDTO,
  CreateActivityRequest,
  OrganisationDTO,
} from '../../types.ts';
import {
  ActivitiesFiltersType,
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

  filtersToDTO(filters: ActivitiesFiltersType): ActivitiesFiltersRequest;

  DTOtoFilters(filtersDTO: ActivitiesFiltersResponse): ActivitiesFiltersType;
  DTOtoTitles(titlesDTO: ActivitiesTitlesResponse): ActivitiesTitles;

  mapFrontendToBackendFilters: (
    filters: ActivitiesFiltersType
  ) => BackendActivitiesFiltersType;

  convertToQueryParams: (
    backendFilters: Partial<BackendActivitiesFiltersType>
  ) => Record<string, string>;
};
