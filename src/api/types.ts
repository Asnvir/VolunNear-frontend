import {AxiosRequestConfig} from 'axios';
import {Role} from './services/AuthServiceImpl.ts';
import {RegisterOrgCredentials} from '../hooks/useRegisterOrg.ts';
import {RegisterVolCredentials} from '../hooks/useRegisterVol.ts';
import {LoginCredentials} from '../hooks/useLogin.ts';

export type HttpResponse<T> = {
  status: number;
  data: T;
};

export type HttpClient = {
  get: <T>(url: string) => Promise<HttpResponse<T>>;
  post: <T, B>(
    url: string,
    body: B,
    options?: AxiosRequestConfig
  ) => Promise<HttpResponse<T>>;
};

export type ActivityDTO = {
  id: string;
  city: string;
  country: string;
  dateOfPlace: string;
  description: string;
  title: string;
  kindOfActivity: string;
};

export type OrganisationDTO = {
  id: string;
  nameOfOrganisation: string;
  country: string;
  city: string;
  address: string;
};

export type ActivitiesResponse = {
  activities: ActivityDTO[];
  organisationResponseDTO: OrganisationDTO;
}[];

export type Activity = {
  activityId: string;
  activityCity: string;
  activityCountry: string;
  activityDateOfPlace: string;
  activityDescription: string;
  activityTitle: string;
  activityKind: string;
  organisationId: string;
  organisationName: string;
  organisationCountry: string;
  organisationCity: string;
  organisationAddress: string;
};

export type User = {
  username: string;
  role: Role;
};

export type AuthService = {
  login: (loginCredentials: LoginCredentials) => Promise<User>;
  logout: () => void;
  registerVolunteer: (
    registerVolCredentials: RegisterVolCredentials
  ) => Promise<void>;
  registerOrganisation: (
    registerOrgCredentials: RegisterOrgCredentials
  ) => Promise<void>;
  getCurrentUser: () => User | null;
};
