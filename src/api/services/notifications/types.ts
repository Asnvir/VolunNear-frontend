import {IOrganisationResponseDTO} from '../../../data-contracts.ts';

export type NotificationService = {
  subscribeToNotifications: (organizationID: string) => Promise<void>;
  unsubscribeFromNotifications: (organizationID: string) => Promise<void>;
  getNotifications: () => Promise<IOrganisationResponseDTO[]>;
};
