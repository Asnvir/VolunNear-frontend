import {ActivityMapperImpl} from '../../../mappers/activitiy/ActivityMapperImpl.ts';
import {ActivitiesResponse, Activity} from '../../../types.ts';
import {ActivityMapper} from '../../../mappers/activitiy/types.ts';
import {
  ActivitiesFiltersType,
  ActivitiesQueryParams,
  ActivitiesService,
  ActivitiesTitles,
  ActivitiesTypes,
  ActivityType,
} from './types.ts';
import {
  ActivitiesFiltersRequest,
  ActivitiesFiltersResponse,
  ActivitiesTitlesResponse,
  HttpClient,
} from '../../../httpClient/types.ts';
import {ActivityUtil} from '../util/types.ts';
import {ActivityUtilImpl} from '../util/ActivityUtilImpl.ts';
import {HttpClientImpl} from '../../../httpClient/HttpClientImpl.ts';
import {API_ENDPOINTS} from '../../../constants.ts';

export class ActivitiesServiceImpl implements ActivitiesService {
  private static instance: ActivitiesServiceImpl | null = null;
  private activityMapper: ActivityMapper = ActivityMapperImpl.getInstance();
  private activityUtil: ActivityUtil = ActivityUtilImpl.getInstance();
  private httpClient: HttpClient = HttpClientImpl.getInstance();

  private constructor() {}

  public static getInstance(): ActivitiesServiceImpl {
    if (!ActivitiesServiceImpl.instance) {
      ActivitiesServiceImpl.instance = new ActivitiesServiceImpl();
    }
    return ActivitiesServiceImpl.instance;
  }

  public async getActivities(
    queryParams: ActivitiesQueryParams
  ): Promise<Activity[]> {
    const backendFilters =
      this.activityMapper.mapFrontendToBackendFilters(queryParams);
    const filteredParams = this.activityUtil.filterEmptyFilters(backendFilters);
    console.log(`filteredParamsAfterEmpty: ${JSON.stringify(filteredParams)}`);
    const {data: organizationsDTO} =
      await this.httpClient.get<ActivitiesResponse>(
        '/api/v1/organisation/activities',
        filteredParams
      );

    console.log(`filteredParams: ${JSON.stringify(filteredParams)}`);

    return organizationsDTO.flatMap(({activities, organisationResponseDTO}) =>
      activities.map(activity =>
        this.activityMapper.fromDTO({
          activity,
          organization: organisationResponseDTO,
        })
      )
    );
  }

  public async addVolunteerToActivity(activityId: string): Promise<void> {
    await this.httpClient.post<void, Record<string, never>>(
      API_ENDPOINTS.JOIN_ACTIVITY + activityId,
      {}
    );
  }

  public async removeVolunteerFromActivity(activityId: string): Promise<void> {
    await this.httpClient.delete<void>(
      API_ENDPOINTS.LEAVE_ACTIVITY + activityId
    );
  }

  public async setActivitiesFilters(
    filters: ActivitiesFiltersType
  ): Promise<ActivitiesFiltersType> {
    const filtersDTO = this.activityMapper.filtersToDTO(filters);
    const response = await this.httpClient.post<
      ActivitiesFiltersResponse,
      ActivitiesFiltersRequest
    >('/api/v1/volunteer/set_preferences', filtersDTO);
    const updatedDTO = response.data;
    // console.log(`updatedDTO: ${JSON.stringify(updatedDTO)}`);
    return this.activityMapper.DTOtoFilters(updatedDTO);
  }

  public async getActivitiesTitles(): Promise<ActivitiesTitles> {
    const {data: titlesDTO} =
      await this.httpClient.get<ActivitiesTitlesResponse>(
        '/api/v1/organisation/all_activities_names'
      );
    const titles = this.activityMapper.DTOtoTitles(titlesDTO);

    return titles;
  }

  public async getActivitiesTypes(): Promise<ActivitiesTypes> {
    return Promise.resolve(Object.values(ActivityType));
  }
}
