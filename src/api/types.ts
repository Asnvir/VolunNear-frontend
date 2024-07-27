import {Role} from './services/auth/service/types.ts';

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

export type CountryDataDTO = {
  country: string;
  cities: string[];
};

export type MappedCountryData = {
  country: string;
  cities: string[];
};
