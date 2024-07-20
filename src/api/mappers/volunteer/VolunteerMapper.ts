import {ActivitiesFiltersDTO, VolunteerMapper} from './types.ts';
import {ActivitiesFiltersType} from '../../../context/types.ts';

export class VolunteerMapperImpl implements VolunteerMapper {
  private static instance: VolunteerMapperImpl;

  private constructor() {}

  public static getInstance(): VolunteerMapperImpl {
    if (!VolunteerMapperImpl.instance) {
      VolunteerMapperImpl.instance = new VolunteerMapperImpl();
    }
    return VolunteerMapperImpl.instance;
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
}
