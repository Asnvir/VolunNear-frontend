import {ActivityMapper} from '../mappers/ActivityMapper.ts';
import {HttpClient, ActivitiesResponse} from '../types.ts';

export class ActivitiesService {
  constructor(private httpClient: HttpClient) {}

  public async getActivities() {
    const {data: organizations} = await this.httpClient.get<ActivitiesResponse>(
      '/api/v1/organisation/get_all_activities'
    );
    // return data.activities.map(activity => ActivityMapper.fromDTO({activity,organization: data.organisationResponseDTO}));
    return organizations.flatMap(({activities, organisationResponseDTO}) =>
      activities.map(activity =>
        ActivityMapper.fromDTO({
          activity,
          organization: organisationResponseDTO,
        })
      )
    );
  }

  // private mapToFrontendActivities = (data: ActivitiesResponse): Activity[] => {
  //     return data.activities.map(activity => ({
  //         activityId: activity.id,
  //         activityCity: activity.city,
  //         activityCountry: activity.country,
  //         activityDateOfPlace: activity.dateOfPlace,
  //         activityDescription: activity.description,
  //         activityTitle: activity.title,
  //         activityKind: activity.kindOfActivity,
  //         organisationId: data.organisationResponseDTO.id,
  //         organisationName: data.organisationResponseDTO.nameOfOrganisation,
  //         organisationCountry: data.organisationResponseDTO.country,
  //         organisationCity: data.organisationResponseDTO.city,
  //         organisationAddress: data.organisationResponseDTO.address,
  //     }));
  // };
}
