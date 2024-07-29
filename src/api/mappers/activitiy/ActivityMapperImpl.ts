import {Activity, ActivityDTO, OrganisationDTO} from '../../types.ts';
import {ActivityMapper} from './types.ts';
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
<<<<<<< Updated upstream
import {format} from 'date-fns';

=======
>>>>>>> Stashed changes

export class ActivityMapperImpl implements ActivityMapper {
  private static instance: ActivityMapperImpl | null = null;

  private constructor() {}

  public static getInstance(): ActivityMapperImpl {
    if (!ActivityMapperImpl.instance) {
      ActivityMapperImpl.instance = new ActivityMapperImpl();
    }
    return ActivityMapperImpl.instance;
  }

  public fromDTO({
    activity,
    organization,
  }: {
    activity: ActivityDTO;
    organization: OrganisationDTO;
  }): Activity {
    return {
      activityId: activity.id,
      activityCity: activity.city,
      activityCountry: activity.country,
      activityDateOfPlace: activity.dateOfPlace,
      activityDescription: activity.description,
      activityTitle: activity.title,
      activityKind: activity.kindOfActivity,
      organisationId: organization.id,
      organisationName: organization.nameOfOrganisation,
      organisationCountry: organization.country,
      organisationCity: organization.city,
      organisationAddress: organization.address,
    };
  }

  public filtersToDTO(
    filters: ActivitiesFiltersType
  ): ActivitiesFiltersRequest {
    console.log(`filters: ${JSON.stringify(filters)}`);

    if (!filters) {
      console.error('Invalid filters object');
      return {preferences: []};
    }

    const preferences = Object.entries(filters)
      .filter(
        ([, value]) => value !== undefined && value !== null && value !== ''
      )
      .map(([key, value]) => `${key}:${value}`);

    const preferencesDTO = {preferences};
    console.log(
      `FiltersToDTO - preferencesDTO: ${JSON.stringify(preferencesDTO)}`
    );
    return preferencesDTO;
  }

  public DTOtoFilters(
    filtersDTO: ActivitiesFiltersResponse
  ): ActivitiesFiltersType {
    return {
      title: filtersDTO.title,
      date: filtersDTO.date,
      type: filtersDTO.type,
      city: filtersDTO.city,
      country: filtersDTO.country,
    };
  }

  public DTOtoTitles(titlesDTO: ActivitiesTitlesResponse): ActivitiesTitles {
    return titlesDTO;
  }

  public mapFrontendToBackendFilters(
    filters: ActivitiesFiltersType
  ): BackendActivitiesFiltersType {
    const {type, date, ...rest} = filters;
    const formattedDate = date ? date : undefined;
    console.log(`formattedDate: ${formattedDate}`);
    return {
      ...rest,
      dateOfPlace: formattedDate,
      kindOfActivity: type,
    };
  }
}
