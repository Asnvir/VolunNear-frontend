import {VolunteerService} from './types.ts';
import {HttpClientService} from '../http/types.ts';
import {ActivitiesFiltersType} from '../../../context/types.ts';
import {VolunteerMapperImpl} from '../../mappers/volunteer/VolunteerMapper.ts';
import {VolunteerMapper} from '../../mappers/volunteer/types.ts';

export class VolunteerServiceImpl implements VolunteerService {
  private static instance: VolunteerServiceImpl | null = null;
  private volMapper: VolunteerMapper = VolunteerMapperImpl.getInstance();

  private constructor(private httpClient: HttpClientService) {}

  public static getInstance(
    httpClient: HttpClientService
  ): VolunteerServiceImpl {
    if (!VolunteerServiceImpl.instance) {
      VolunteerServiceImpl.instance = new VolunteerServiceImpl(httpClient);
    }
    return VolunteerServiceImpl.instance;
  }

  public updateVolunteerPreferences(
    filters: ActivitiesFiltersType
  ): Promise<ActivitiesFiltersType> {
    const preferencesDTO = this.volMapper.preferencesToDTO(filters);
  }
}
