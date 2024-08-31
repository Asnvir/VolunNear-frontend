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
  street: string;
  numberOfHouse: string;
  kindOfActivity: string;
  dateOfPlace: string;
  locationDTO: LocationDTO;
  distance: number;
  coverImage: string;
  galleryImages: string[];
};

export type OrganisationResponseDTO = {
  id: string;
  nameOfOrganisation: string;
  country: string;
  city: string;
  address: string;
  avatarUrl?: string;
  email: string;
  username: string;
  rating: number;
};

export type ActivitiesDTO = {
  activities: ActivityDTO[];
  organisationResponseDTO: OrganisationResponseDTO;
}[];

export type PageActivitiesDTO = {
  totalElements: number;
  totalPages: number;
  size: number;
  content: ActivitiesDTO;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type ActivitiesResponse = PageActivitiesDTO;

export type OrganisationActivitiesResponse = ActivityDTO[];

export type Activity = {
  activityId: string;
  activityCity: string;
  activityCountry: string;
  activityStreet: string;
  activityNumberOfHouse: string;
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
  activityGalleryImages: string[];
};

export type CreateActivityRequest = {
  title: string;
  description: string;
  country: string;
  city: string;
  street: string;
  numberOfHouse: string;
  kindOfActivity: string;
  dateOfPlace: string;
  coverImage: string;
  galleryImages: string[];
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
