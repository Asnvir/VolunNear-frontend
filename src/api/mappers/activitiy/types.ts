import {Activity, ActivityDTO, OrganisationDTO} from '../../types.ts';
import {
  ActivitiesFiltersType,
  ActivitiesTitles,
  BackendActivitiesFiltersType,
} from '../../services/activities/service/types.ts';
import {
  ActivitiesFiltersRequest,
  ActivitiesFiltersResponse,
  ActivitiesTitlesResponse,
} from '../../services/http/types.ts';

export type ActivityMapper = {
  fromDTO({
    activity,
    organization,
  }: {
    activity: ActivityDTO;
    organization: OrganisationDTO;
  }): Activity;

  filtersToDTO(filters: ActivitiesFiltersType): ActivitiesFiltersRequest;

  DTOtoFilters(filtersDTO: ActivitiesFiltersResponse): ActivitiesFiltersType;
  DTOtoTitles(titlesDTO: ActivitiesTitlesResponse): ActivitiesTitles;

  mapFrontendToBackendFilters: (
    filters: ActivitiesFiltersType
  ) => BackendActivitiesFiltersType;
};
