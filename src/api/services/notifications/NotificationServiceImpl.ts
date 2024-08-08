import {HttpClient} from '../../httpClient/types.ts';
import {HttpClientImpl} from '../../httpClient/HttpClientImpl.ts';
import {NotificationService} from './types.ts';
import {IOrganisationResponseDTO} from '../../../data-contracts.ts';
import {API_ENDPOINTS} from '../../constants.ts';

export class NotificationServiceImpl implements NotificationService {
  private static instance: NotificationServiceImpl | null = null;
  private httpClient: HttpClient = HttpClientImpl.getInstance();

  private constructor() {
  }

  public static getInstance(): NotificationServiceImpl {
    if (!NotificationServiceImpl.instance) {
      NotificationServiceImpl.instance = new NotificationServiceImpl();
    }
    return NotificationServiceImpl.instance;
  }

  public async getNotifications(): Promise<IOrganisationResponseDTO[]> {
    const {data: organizationsDTO} = await this.httpClient.get<
      IOrganisationResponseDTO[]
    >(API_ENDPOINTS.GET_ALL_SUBSCRIPTIONS);
    return organizationsDTO;
  }

  public async subscribeToNotifications(organizationID: string): Promise<void> {
   await this.httpClient.post(API_ENDPOINTS.SUBSCRIBE_TO_ORGANISATION+`?idOfOrganisation=${organizationID}`,{});
  }

  public async unsubscribeFromNotifications(organizationID: string): Promise<void> {
    await this.httpClient.delete(API_ENDPOINTS.UNSUBSCRIBE_FROM_ORGANISATION+`?idOfOrganisation=${organizationID}`);
  }
}