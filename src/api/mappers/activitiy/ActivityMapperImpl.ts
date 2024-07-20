import {ActivityDTO, Activity, OrganisationDTO} from '../../types.ts';
import {ActivityMapper} from './types.ts';
import {ActivitiesFiltersType} from '../../services/activities/service/types.ts';
import {ActivitiesFiltersDTO} from '../volunteer/types.ts';

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

  public preferencesToDTO(
    filters: ActivitiesFiltersType
  ): ActivitiesFiltersDTO {
    const preferences = Object.entries(filters)
      .filter(
        ([, value]) => value !== undefined && value !== null && value !== ''
      )
      .map(([key, value]) => `${key}:${value}`);

    return {preferences};
  }

  public DTOToPreferences(
    filtersDTO: ActivitiesFiltersDTO
  ): ActivitiesFiltersType {
    const filters: ActivitiesFiltersType = {};
    const {preferences} = filtersDTO;
    preferences.forEach(preference => {
      const [key, value] = preference.split(':');
      filters[key as keyof ActivitiesFiltersType] = value;
    });
    return filters;
  }
}
