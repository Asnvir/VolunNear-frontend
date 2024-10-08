import {Activity, CreateActivityRequest} from '../../../types.ts';
import {ICreatedActivityDTO} from '../../../../data-contracts.ts';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type VolunteerActivitiesFiltersType = {
  title?: string;
  date?: string;
  type?: string;
  city?: string;
  country?: string;
  isMyActivities?: string;
};

export type OrganisationActivitiesFiltersType = {
  title?: string;
  date?: string;
  type?: string;
  city?: string;
  country?: string;
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
  ALL = 'ALL',
}
export type ActivitiesTypes = ActivityType[];

export type PaginationParams = {
  page: number;
  size: number;
};

export type SortOrder = {
  sortOrder: 'ASC' | 'DESC';
};

export type VolunteerActivitiesQueryParams = VolunteerActivitiesFiltersType &
  PaginationParams &
  SortOrder &
  Coordinates;

export type OrganisationActivitiesQueryParams =
  OrganisationActivitiesFiltersType &
    PaginationParams &
    Coordinates &
    SortOrder;

export type BackendActivitiesFiltersType = Omit<
  VolunteerActivitiesFiltersType,
  'type' | 'date' | 'isMyActivities'
> & {
  kindOfActivity?: string;
  dateOfPlace?: string;
  myActivities?: boolean;
};

export type ActivitiesService = {
  getVolunteerActivities(
    queryParams: VolunteerActivitiesQueryParams
  ): Promise<Activity[]>;
  getOrganisationActivities(
    queryParams: OrganisationActivitiesQueryParams
  ): Promise<Activity[]>;

  setActivitiesFilters: (
    filters: VolunteerActivitiesFiltersType
  ) => Promise<VolunteerActivitiesFiltersType>;

  getActivitiesTitles(): Promise<ActivitiesTitles>;
  getOrganisationActivitiesTitles(): Promise<ActivitiesTitles>;

  getActivitiesTypes(): Promise<ActivitiesTypes>;

  addVolunteerToActivity(activityId: string): Promise<void>;

  removeVolunteerFromActivity(activityId: string): Promise<void>;

  createActivity(activity: CreateActivityRequest): Promise<ICreatedActivityDTO>;

  deleteActivity(activityId: string): Promise<void>;
};
