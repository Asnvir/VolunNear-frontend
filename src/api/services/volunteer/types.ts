import {VolunteerActivitiesFiltersType} from '../../../context/types.ts';
import {
  IUpdateVolunteerInfoRequestDTO,
  IVolunteerProfileResponseDTO,
} from '../../../data-contracts.ts';

export type VolunteerService = {
  updateVolunteerPreferences(
    filters: ActivitiesFiltersType
  ): Promise<ActivitiesFiltersType>;
  getVolunteerProfile(): Promise<IVolunteerProfileResponseDTO>;
  updateVolunteerProfile(
    updateVolunteerInfo: UpdateVolunteerInfo
  ): Promise<IUpdateVolunteerInfoRequestDTO>;
  isVolunteerActivityJoined(activityId: string): Promise<boolean>;
};

export type UpdateVolunteerInfo = {
  username?: string;
  realName?: string;
  email?: string;
};
