import {VolunteerService} from './types.ts';
import {HttpClientService} from '../http/types.ts';
import {ActivitiesFiltersType} from '../../../context/types.ts';
import {VolunteerMapperImpl} from '../../mappers/volunteer/VolunteerMapper.ts';
import {VolunteerMapper} from '../../mappers/volunteer/types.ts';
import {HttpClientImpl} from '../http/HttpClientImpl.ts';

export class VolunteerServiceImpl implements VolunteerService {
  private static instance: VolunteerServiceImpl | null = null;
  private volMapper: VolunteerMapper = VolunteerMapperImpl.getInstance();
  private httpClient: HttpClientService = HttpClientImpl.getInstance();

  private constructor() {}

  public static getInstance(): VolunteerServiceImpl {
    if (!VolunteerServiceImpl.instance) {
      VolunteerServiceImpl.instance = new VolunteerServiceImpl();
    }
    return VolunteerServiceImpl.instance;
  }

  public updateVolunteerPreferences(
    filters: ActivitiesFiltersType
  ): Promise<ActivitiesFiltersType> {
    const preferencesDTO = this.volMapper.preferencesToDTO(filters);

    return preferencesDTO;
  }
}
