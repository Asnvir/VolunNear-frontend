import {ActivityMapper} from '../mappers/ActivityMapper.ts';
import {HttpClient, ActivitiesResponse} from '../types.ts';

export class ActivitiesServiceImpl {
  constructor(private httpClient: HttpClient) {}

  public async getActivities() {
    const {data: organizations} = await this.httpClient.get<ActivitiesResponse>(
      '/api/v1/organisation/get_all_activities'
      // 'error'
    );
    return organizations.flatMap(({activities, organisationResponseDTO}) =>
      activities.map(activity =>
        ActivityMapper.fromDTO({
          activity,
          organization: organisationResponseDTO,
        })
      )
    );
  }
}
