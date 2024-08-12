import {
  Activity,
  ActivityDTO,
  CreateActivityRequest,
  OrganisationDTO,
} from '../../types.ts';
import {ActivityMapper} from './types.ts';
import {
  ActivitiesTitles,
  ActivityType,
  BackendActivitiesFiltersType,
  VolunteerActivitiesFiltersType,
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
    filters: VolunteerActivitiesFiltersType
  ): ActivitiesFiltersRequest {
    if (!filters) {
      return {preferences: []};
    }

    const preferences = Object.entries(filters)
      .filter(
        ([, value]) => value !== undefined && value !== null && value !== ''
      )
      .map(([key, value]) => `${key}:${value}`);

    return {preferences};
  }

  public DTOtoFilters(
    filtersDTO: ActivitiesFiltersResponse
  ): VolunteerActivitiesFiltersType {
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

  private mapLabelToEnum(label: string | undefined): ActivityType | undefined {
    if (!label) return undefined;

    const formattedLabel = label.toUpperCase().replace(' ', '_');
    return ActivityType[formattedLabel as keyof typeof ActivityType];
  }

  public mapFrontendToBackendFilters(
    filters: VolunteerActivitiesFiltersType,
    isOrganisation: boolean
  ): BackendActivitiesFiltersType {
    const {type, date, isMyActivities, ...rest} = filters;

    const kindOfActivity = this.mapLabelToEnum(type) || '';

    if (isOrganisation) {
      return {
        ...rest,
        dateOfPlace: date,
        kindOfActivity:
          kindOfActivity === ActivityType.ALL || kindOfActivity === undefined
            ? ''
            : kindOfActivity,
      };
    }

    return {
      ...rest,
      myActivities: isMyActivities === 'true',
      dateOfPlace: date,
      kindOfActivity:
        kindOfActivity === ActivityType.ALL || kindOfActivity === undefined
          ? ''
          : kindOfActivity,
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
