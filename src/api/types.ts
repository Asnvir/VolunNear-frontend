import {Role} from './services/auth/service/types.ts';

export type ActivityDTO = {
  id: string;
  city: string;
  country: string;
  dateOfPlace: string;
  description: string;
  title: string;
  kindOfActivity: string;
  distance: number;
  locationDTO: LocationDTO;
  coverImage: string;
};

export type LocationDTO = {
  latitude: number;
  longitude: number;
};


export type OrganisationDTO = {
  id: string;
  nameOfOrganisation: string;
  country: string;
  city: string;
  address: string;
  avatarUrl: string;
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
  activityDistance: number;
  activityLocation: LocationDTO;
  activityCoverImage: string;
  organisationId: string;
  organisationName: string;
  organisationCountry: string;
  organisationCity: string;
  organisationAddress: string;
  organisationAvatarImage: string;
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
