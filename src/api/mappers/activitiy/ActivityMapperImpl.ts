import {
  Activity,
  ActivityDTO,
  CreateActivityRequest,
  OrganisationDTO,
} from '../../types.ts';
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
import {IAddActivityRequestDTO} from '../../../data-contracts.ts';
// import {format} from 'date-fns';

export class ActivityMapperImpl implements ActivityMapper {
  private static instance: ActivityMapperImpl | null = null;

  private constructor() {}

  public static getInstance(): ActivityMapperImpl {
    if (!ActivityMapperImpl.instance) {
      ActivityMapperImpl.instance = new ActivityMapperImpl();
    }
    return ActivityMapperImpl.instance;
  }

  public toDto(activity: CreateActivityRequest): IAddActivityRequestDTO {
    return {
      title: activity.title,
      description: activity.description,
      country: activity.country,
      city: activity.city,
      street: activity.street,
      houseNumber: activity.numberOfHouse,
      kindOfActivity: activity.kindOfActivity,
      dateOfPlace: activity.dateOfPlace,
    };
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
      activityTitle: activity.title,
      activityDescription: activity.description,
      activityCountry: activity.country,
      activityCity: activity.city,
      activityStreet: activity.street,
      activityNumberOfHouse: activity.numberOfHouse,
      activityKind: activity.kindOfActivity,
      activityDateOfPlace: activity.dateOfPlace,
      activityLatitude: activity.locationDTO.latitude,
      activityLongitude: activity.locationDTO.longitude,
      activityDistance: activity.distance,
      activityCoverImage: activity.coverImage,
      activityGalleryImages: activity.galleryImages,
      organisationId: organization.id,
      organisationName: organization.nameOfOrganisation,
      organisationCountry: organization.country,
      organisationCity: organization.city,
      organisationAddress: organization.address,
      organisationAvatarUrl: organization.avatarUrl,
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
    const {type, date, isMyActivities, ...rest} = filters;
    // const formattedDate = date ? format(date, 'yyyy-MM-dd') : undefined;
    // console.log(`formattedDate: ${formattedDate}`);
    return {
      ...rest,
      myActivities: isMyActivities === 'true',
      dateOfPlace: date,
      kindOfActivity: type,
    };
  }

  public convertToQueryParams(
    backendFilters: Partial<BackendActivitiesFiltersType>
  ): Record<string, string> {
    return Object.fromEntries(
      Object.entries(backendFilters).map(([key, value]) => [key, String(value)])
    );
  }
}
