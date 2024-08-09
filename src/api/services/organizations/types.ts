import {IActivitiesDTO, IOrganisationInfoDTO} from '../../../data-contracts.ts';

export type OrganizationFiltersType = {
  nameOfOrganisation?: string;
  country?: string;
  city?: string;
  sortOrder?: string;
};

export type Organization = {
  id: string;
  nameOfOrganisation: string;
  country: string;
  city: string;
  address: string;
  avatarUrl: string;
};

export type OrganizationDTO = {
  id: string;
  nameOfOrganisation: string;
  country: string;
  city: string;
  address: string;
  avatarUrl: string;
};

export type OrganizationsTitles = string[];

export type OrganizationService = {
  getOrganizations: (
    filters: OrganizationFiltersType,
  ) => Promise<Organization[]>;
  getOrganizationsTitles: (
    filters: OrganizationFiltersType,
  ) => Promise<OrganizationsTitles>;
  getOrganisationProfile: () => Promise<IActivitiesDTO>;
  updateOrganisationInfo: (
    updateOrganisationInfoData: IOrganisationInfoDTO,
  ) => Promise<IOrganisationInfoDTO>;
  getAverageRating: (orgId: string) => Promise<number>;
  addOrUpdateRating: (orgId: string, rating: number) => Promise<void>;
};
