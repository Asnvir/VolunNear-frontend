import {ActivityUtil} from './types.ts';
import {VolunteerActivitiesFiltersType} from '../service/types.ts';

export class ActivityUtilImpl implements ActivityUtil {
  private static instance: ActivityUtilImpl | null = null;

  private constructor() {}

  public static getInstance(): ActivityUtilImpl {
    if (!ActivityUtilImpl.instance) {
      ActivityUtilImpl.instance = new ActivityUtilImpl();
    }
    return ActivityUtilImpl.instance;
  }

  public filterEmptyFilters = (
    filters: VolunteerActivitiesFiltersType
  ): Partial<VolunteerActivitiesFiltersType> => {
    return Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== '')
    );
  };
}
