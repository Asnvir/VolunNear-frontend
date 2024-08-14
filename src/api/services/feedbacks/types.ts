import {IFeedbackRequest, IFeedbackResponseDTO} from '../../../data-contracts.ts';

export type FeedbackService = {
  postFeedback: (feedback: IFeedbackRequest) => Promise<string>;
  getAllFeedbacks: (id: string) => Promise<IFeedbackResponseDTO[]>;
}