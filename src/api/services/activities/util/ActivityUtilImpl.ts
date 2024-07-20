import {ActivityUtil} from './types.ts';
import {ActivitiesFiltersType} from '../service/types.ts';

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
    filters: ActivitiesFiltersType
  ): Partial<ActivitiesFiltersType> => {
    return Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== '')
    );
  };
}
