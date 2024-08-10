import {IFeedbackRequest} from '../../../data-contracts.ts';

export type FeedbackService = {
  postFeedback: (feedback: IFeedbackRequest) => Promise<string>;
}