

import {FeedbackService} from './types.ts';
import {HttpClient} from '../../httpClient/types.ts';
import {HttpClientImpl} from '../../httpClient/HttpClientImpl.ts';
import {IFeedbackRequest, IFeedbackResponseDTO} from '../../../data-contracts.ts';
import {API_ENDPOINTS} from '../../constants.ts';

export class FeedbackServiceImpl implements FeedbackService {
  private static instance: FeedbackServiceImpl | null = null;
  private httpClient: HttpClient = HttpClientImpl.getInstance();

  private constructor() {
  }

  public static getInstance(): FeedbackServiceImpl {
    if (!FeedbackServiceImpl.instance) {
      FeedbackServiceImpl.instance = new FeedbackServiceImpl();
    }
    return FeedbackServiceImpl.instance;
  }

  public async postFeedback(feedback: IFeedbackRequest): Promise<string> {
     const {data} = await this.httpClient.post<string,IFeedbackRequest>(
      API_ENDPOINTS.POST_FEEDBACK, feedback
    )
    return data;
  }

  public async getAllFeedbacks(id: string): Promise<IFeedbackResponseDTO[]> {
    const {data} = await this.httpClient.get<IFeedbackResponseDTO[]>(
      `${API_ENDPOINTS.GET_FEEDBACKS}?id=${id}`
    )
    return data;
  }

}
