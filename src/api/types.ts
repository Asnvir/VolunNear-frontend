import {Role} from './services/auth/service/types.ts';

export type LocationDTO = {
  latitude: number;
  longitude: number;
};

export type AppUserDTO = {
  id: string;
  username: string;
  email: string;
  roles: RoleDTO[];
};

export type RoleDTO = {
  id: string;
  name: string;
};

export type GalleryImageDTO = {
  id: string;
  imageUrl: string;
  activity: {
    id: string;
    title: string;
    description: string;
    country: string;
    city: string;
    street?: string;
    numberOfHouse?: string;
    kindOfActivity: string;
    dateOfPlace: string;
    latitude?: number;
    longitude?: number;
    coverImageUrl?: string;
  };
};

export type ActivityDTO = {
  id: string;
  title: string;
  description: string;
  country: string;
  city: string;
  kindOfActivity: string;
  dateOfPlace: string;
  locationDTO: LocationDTO;
  distance: number;
  coverImage: string;
  galleryImages: GalleryImageDTO[];
  appUser?: AppUserDTO;
};

export type OrganisationDTO = {
  id: string;
  nameOfOrganisation: string;
  country: string;
  city: string;
  address: string;
  avatarUrl?: string;
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
  organisationAvatarUrl?: string; // Add this line
  activityLatitude: number;
  activityLongitude: number;
  activityDistance: number;
  activityCoverImage: string;
  activityGalleryImages: {
    id: string;
    imageUrl: string;
    nestedActivityId: string;
    nestedActivityTitle: string;
    nestedActivityDescription: string;
    nestedActivityCountry: string;
    nestedActivityCity: string;
    nestedActivityStreet?: string;
    nestedActivityNumberOfHouse?: string;
    nestedActivityKind: string;
    nestedActivityDateOfPlace: string;
    nestedActivityLatitude?: number;
    nestedActivityLongitude?: number;
    nestedActivityCoverImageUrl?: string;
  }[];
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
