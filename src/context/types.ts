import {User} from '../api/types.ts';
import {VolunteerService} from '../api/services/volunteer/types.ts';
import {
  VolunteerActivitiesFiltersType,
  ActivitiesService,
} from '../api/services/activities/service/types.ts';
import {AuthService} from '../api/services/auth/service/types.ts';
import {FileUploadService} from '../api/services/files/service/types.ts';
import {PlacesService} from '../api/services/places/types.ts';
import {OrganizationService} from '../api/services/organizations/types.ts';
import {NotificationService} from '../api/services/notifications/types.ts';
import {FeedbackService} from '../api/services/feedbacks/types.ts';

export type ServiceContextType = {
  activitiesService: ActivitiesService;
  authService: AuthService;
  organizationService: OrganizationService;
  volunteerService: VolunteerService;
  fileUploadService: FileUploadService;
  formService: PlacesService;
  notificationService: NotificationService;
  feedbackService: FeedbackService;
};

export type AppStateType = {
  user: User | null;
};

export type AppStateContextType = {
  state: AppStateType;
  setUser: (user: User | null) => void;
};

export type ActivitiesContextType = {
  filters: VolunteerActivitiesFiltersType;
  setFilters: (filters: VolunteerActivitiesFiltersType) => void;
};
