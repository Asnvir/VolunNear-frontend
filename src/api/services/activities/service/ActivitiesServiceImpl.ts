import {ActivityMapperImpl} from '../../../mappers/activitiy/ActivityMapperImpl.ts';
import {
  ActivitiesResponse,
  Activity,
  ActivityDTO,
  CreateActivityRequest,
  OrganisationActivitiesResponse,
} from '../../../types.ts';
import {ActivityMapper} from '../../../mappers/activitiy/types.ts';
import {
  ActivitiesFiltersType,
  ActivitiesService,
  ActivitiesTitles,
  ActivitiesTypes,
  ActivityType,
  OrganisationActivitiesQueryParams,
  VolunteerActivitiesQueryParams,
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
import {ICreatedActivityDTO} from '../../../../data-contracts.ts';

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

  public async getVolunteerActivities(
    params: VolunteerActivitiesQueryParams
  ): Promise<Activity[]> {
    const queryParams = {
      ...params,
      type: params.type === ActivityType.ALL ? '' : params.type,
    };

    const backendFilters = this.activityMapper.mapFrontendToBackendFilters(
      queryParams,
      false
    );
    const filteredParams = this.activityUtil.filterEmptyFilters(backendFilters);

    const queryParamsAsString =
      this.activityMapper.convertToQueryParams(filteredParams);

    const queryParamsString = new URLSearchParams(
      queryParamsAsString
    ).toString();

    const {data: organizationsDTO} =
      await this.httpClient.get<ActivitiesResponse>(
        `/api/v1/organisation/activities?${queryParamsString}`
      );

    return organizationsDTO.flatMap(({activities, organisationResponseDTO}) =>
      activities.map(activity =>
        this.activityMapper.fromDTO({
          activity,
          organization: organisationResponseDTO,
        })
      )
    );
  }

  public async getOrganisationActivities(
    params: OrganisationActivitiesQueryParams
  ): Promise<Activity[]> {
    const queryParams = {
      ...params,
      type: params.type === ActivityType.ALL ? '' : params.type,
    };

    const backendFilters = this.activityMapper.mapFrontendToBackendFilters(
      queryParams,
      true
    );
    const filteredParams = this.activityUtil.filterEmptyFilters(backendFilters);

    const queryParamsAsString =
      this.activityMapper.convertToQueryParams(filteredParams);

    const queryParamsString = new URLSearchParams(
      queryParamsAsString
    ).toString();

    const {data: activityDTOS} =
      await this.httpClient.get<OrganisationActivitiesResponse>(
        `/api/v1/organisation/get_activities?${queryParamsString}`
      );

    return activityDTOS.map(activityDTO =>
      this.mapActivityDTOToActivity(activityDTO)
    );
  }

  private mapActivityDTOToActivity(activityDTO: ActivityDTO): Activity {
    return {
      activityId: activityDTO.id,
      activityTitle: activityDTO.title,
      activityDescription: activityDTO.description,
      activityCountry: activityDTO.country,
      activityCity: activityDTO.city,
      activityStreet: activityDTO.street,
      activityNumberOfHouse: activityDTO.numberOfHouse,
      activityKind: activityDTO.kindOfActivity,
      activityDateOfPlace: activityDTO.dateOfPlace,
      activityLatitude: activityDTO.locationDTO.latitude,
      activityLongitude: activityDTO.locationDTO.longitude,
      activityDistance: activityDTO.distance,
      activityCoverImage: activityDTO.coverImage,
      activityGalleryImages: activityDTO.galleryImages,
      organisationId: '',
      organisationName: '',
      organisationCountry: '',
      organisationCity: '',
      organisationAddress: '',
      organisationAvatarUrl: '',
    };
  }

  public async addVolunteerToActivity(activityId: string): Promise<void> {
    await this.httpClient.post<void, Record<string, never>>(
      API_ENDPOINTS.JOIN_ACTIVITY + activityId,
      {}
    );
  }

  public async createActivity(
    activity: CreateActivityRequest
  ): Promise<ICreatedActivityDTO> {
    const activityDTO = this.activityMapper.toDto(activity);
    const {data: activityResponseDTO} = await this.httpClient.post<
      ICreatedActivityDTO,
      CreateActivityRequest
    >(API_ENDPOINTS.CREATE_ACTIVITY, activityDTO);
    return activityResponseDTO;
  }

  public async deleteActivity(activityId: string): Promise<void> {
    await this.httpClient.delete<void>(
      API_ENDPOINTS.DELETE_ACTIVITY + activityId
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
    return this.activityMapper.DTOtoFilters(updatedDTO);
  }

  public async getActivitiesTitles(): Promise<ActivitiesTitles> {
    const {data: titlesDTO} =
      await this.httpClient.get<ActivitiesTitlesResponse>(
        '/api/v1/organisation/all_activities_names'
      );
    return this.activityMapper.DTOtoTitles(titlesDTO);
  }

  public async getActivitiesTypes(): Promise<ActivitiesTypes> {
    return Promise.resolve(Object.values(ActivityType));
  }

  public async getOrganisationActivitiesTitles(): Promise<ActivitiesTitles> {
    const {data: organizationActivitiesDTO} =
      await this.httpClient.get<OrganisationActivitiesResponse>(
        `/api/v1/organisation/get_activities?sortOrder=ASC`
      );
    return organizationActivitiesDTO.map(activity => activity.title);
  }
}
