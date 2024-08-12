import {ActivitiesFiltersDTO, VolunteerMapper} from './types.ts';
import {VolunteerActivitiesFiltersType} from '../../../context/types.ts';
import {UpdateVolunteerInfo} from '../../services/volunteer/types.ts';
import {IUpdateVolunteerInfoRequestDTO} from '../../../data-contracts.ts';

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

  public updateVolunteerInfoToDTO(
    updateVolunteerInfo: UpdateVolunteerInfo
  ): IUpdateVolunteerInfoRequestDTO {
    return {
      userName: updateVolunteerInfo.username,
      realName: updateVolunteerInfo.realName,
      email: updateVolunteerInfo.email,
    };
  }
}
