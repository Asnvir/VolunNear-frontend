import {AxiosRequestConfig} from "axios";

export type HttpResponse<T> = {
  status: number;
  data: T;
};

export type HttpClient = {
  get: <T>(url: string) => Promise<HttpResponse<T>>;
  post: <T, B>(url: string, body: B, options?: AxiosRequestConfig) => Promise<HttpResponse<T>>;
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
