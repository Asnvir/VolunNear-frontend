import {ActivityMapperImpl} from '../../../mappers/activitiy/ActivityMapperImpl.ts';
import {ActivitiesResponse, Activity} from '../../../types.ts';
import {ActivityMapper} from '../../../mappers/activitiy/types.ts';
import {
  ActivitiesFiltersDTO,
  ActivitiesFiltersType,
  ActivitiesService,
} from './types.ts';
import {HttpClientService} from '../../http/types.ts';
import {ActivityUtil} from '../util/types.ts';
import {ActivityUtilImpl} from '../util/ActivityUtilImpl.ts';

export class ActivitiesServiceImpl implements ActivitiesService {
  private static instance: ActivitiesServiceImpl | null = null;
  private activityMapper: ActivityMapper = ActivityMapperImpl.getInstance();
  private activityUtil: ActivityUtil = ActivityUtilImpl.getInstance();
  private constructor(private httpClient: HttpClientService) {}

  public static getInstance(
    httpClient: HttpClientService
  ): ActivitiesServiceImpl {
    if (!ActivitiesServiceImpl.instance) {
      ActivitiesServiceImpl.instance = new ActivitiesServiceImpl(httpClient);
    }
    return ActivitiesServiceImpl.instance;
  }

  public async getActivities(
    queryParams: ActivitiesFiltersType
  ): Promise<Activity[]> {
    const filteredParams = this.activityUtil.filterEmptyFilters(queryParams);
    const {data: organizations} = await this.httpClient.get<ActivitiesResponse>(
      '/api/v1/organisation/get_all_activities',
      filteredParams
    );

    return organizations.flatMap(({activities, organisationResponseDTO}) =>
      activities.map(activity =>
        this.activityMapper.fromDTO({
          activity,
          organization: organisationResponseDTO,
        })
      )
    );
  }

  public async setActivitiesFilters(
    filters: ActivitiesFiltersType
  ): Promise<ActivitiesFiltersType> {
    const filtersDTO = this.activityMapper.preferencesToDTO(filters);
    const response = await this.httpClient.post<
      ActivitiesFiltersDTO,
      ActivitiesFiltersDTO
    >('/api/v1/volunteer/set_preferences', filtersDTO);
    const updatedDTO = response.data;
    return this.activityMapper.DTOToPreferences(updatedDTO);
  }
}
