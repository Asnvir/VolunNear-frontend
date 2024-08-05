import {Activity, CreateActivityRequest} from '../../../types.ts';
import {ICreatedActivityDTO} from '../../../../data-contracts.ts';

export type SortOrder = 'ASC' | 'DESC';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type ActivitiesFiltersType = {
  title?: string;
  date?: string;
  type?: string;
  city?: string;
  country?: string;
  isMyActivities?: string;
};

export type ActivitiesTitles = string[];
export enum ActivityType {
  UNKNOWN = 'UNKNOWN',
  FAMILY = 'FAMILY',
  SPORT = 'SPORT',
  EDUCATION = 'EDUCATION',
  ENVIRONMENT = 'ENVIRONMENT',
  HEALTH = 'HEALTH',
  COMMUNITY = 'COMMUNITY',
  CULTURE = 'CULTURE',
  TECHNOLOGY = 'TECHNOLOGY',
  ANIMAL_CARE = 'ANIMAL_CARE',
  ELDERLY_CARE = 'ELDERLY_CARE',
  DISASTER_RELIEF = 'DISASTER_RELIEF',
  ARTS = 'ARTS',
  MUSIC = 'MUSIC',
  CHILDREN = 'CHILDREN',
  OTHER = 'OTHER',
}
export type ActivitiesTypes = ActivityType[];

export type ActivitiesQueryParams = ActivitiesFiltersType & {
  sortOrder: SortOrder;
} & Coordinates;

export type BackendActivitiesFiltersType = Omit<
  ActivitiesFiltersType,
  'type' | 'date'
> & {
  kindOfActivity?: string;
  dateOfPlace?: string;
};

export type ActivitiesService = {
  getActivities(queryParams: ActivitiesQueryParams): Promise<Activity[]>;

  setActivitiesFilters: (
    filters: ActivitiesFiltersType
  ) => Promise<ActivitiesFiltersType>;

  getActivitiesTitles(): Promise<ActivitiesTitles>;

  getActivitiesTypes(): Promise<ActivitiesTypes>;

  addVolunteerToActivity(activityId: string): Promise<void>;

  removeVolunteerFromActivity(activityId: string): Promise<void>;

  createActivity(activity: CreateActivityRequest): Promise<ICreatedActivityDTO>;

  deleteActivity(activityId: string): Promise<void>;
};
