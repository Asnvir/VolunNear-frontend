/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface IUpdateVolunteerInfoRequestDTO {
  email?: string;
  realName?: string;
  userName?: string;
}

export interface IVolunteerInfoDTO {
  /** @format uuid */
  id?: string;
  email?: string;
  realName?: string;
}

export interface IUpdateOrganisationInfoRequestDTO {
  email?: string;
  nameOfOrganisation?: string;
  country?: string;
  city?: string;
  address?: string;
}

export interface IOrganisationInfoDTO {
  /** @format uuid */
  id?: string;
  email?: string;
  userName?: string;
  nameOfOrganisation?: string;
  country?: string;
  city?: string;
  address?: string;
}

export interface IAddActivityRequestDTO {
  title?: string;
  description?: string;
  country?: string;
  city?: string;
  kindOfActivity?: string;
}

export interface IActivityDTO {
  /** @format uuid */
  id?: string;
  city?: string;
  country?: string;
  /** @format date-time */
  dateOfPlace?: string;
  description?: string;
  title?: string;
  kindOfActivity?: string;
}

export interface IFeedbackRequest {
  /** @format uuid */
  idOfOrganisation?: string;
  /** @format int32 */
  rate?: number;
  feedbackDescription?: string;
}

export interface IPreferencesRequestDTO {
  preferences?: string[];
}

export interface IRegistrationVolunteerRequestDTO {
  username?: string;
  password?: string;
  email?: string;
  realName?: string;
}

export interface IRegistrationOrganisationRequestDTO {
  username?: string;
  password?: string;
  email?: string;
  nameOfOrganisation?: string;
  country?: string;
  city?: string;
  address?: string;
}

export interface IActivitiesDTO {
  activities?: IActivityDTO[];
  organisationResponseDTO?: IOrganisationResponseDTO;
}

export interface IOrganisationResponseDTO {
  /** @format uuid */
  id?: string;
  nameOfOrganisation?: string;
  country?: string;
  city?: string;
  address?: string;
}

export interface IVolunteerProfileResponseDTO {
  /** @format uuid */
  id?: string;
  email?: string;
  username?: string;
  realName?: string;
  avatarUrl?: string;
  preferences?: string[];
  activitiesDTO?: IActivitiesDTO[];
}

export interface INearbyActivitiesRequestDTO {
  country?: string;
  city?: string;
}

export interface IFeedbackResponseDTO {
  /** @format uuid */
  id?: string;
  /** @format int32 */
  rate?: number;
  description?: string;
  realNameOfUser?: string;
  username?: string;
}

export type IUpdateVolunteerInfoData = IVolunteerInfoDTO;

export type IUpdateOrganisationInfoData = IOrganisationInfoDTO;

export interface IUpdateActivityInformationParams {
  /** @format uuid */
  idOfActivity: string;
}

export type IUpdateActivityInformationData = IActivityDTO;

export interface IUpdateFeedbackInfoForCurrentOrganisationParams {
  /** @format uuid */
  idOfFeedback: string;
}

export type IUpdateFeedbackInfoForCurrentOrganisationData = string;

export type ISetVolunteersPreferencesData = string;

export interface IAddVolunteerToActivityParams {
  /** @format uuid */
  id: string;
}

export type IAddVolunteerToActivityData = string;

export type IAddCommunityLinkPayload = string;

export type IAddCommunityLinkData = object;

export type IAddChatLinkToActivityPayload = string;

export interface IAddChatLinkToActivityParams {
  /** @format uuid */
  idOfActivity: string;
}

export type IAddChatLinkToActivityData = object;

export type IRegistrationOfVolunteerData = any;

export type IRegistrationOfOrganisationData = any;

export type IAddActivityToOrganisationData = any;

export interface ISubscribeToNotificationsByIdOfOrganisationParams {
  /** @format uuid */
  idOfOrganisation: string;
}

export type ISubscribeToNotificationsByIdOfOrganisationData = string;

// export type ICreateAuthTokenData = IJwtResponse;

export type IPostFeedbackAboutOrganisationData = string;

export type IGetVolunteerProfileData = IVolunteerProfileResponseDTO;

export type IGetRecommendationsByPreferencesOfUserData = IActivitiesDTO[];

export type IGetRecommendationsByPreferencesOfUserError = object;

export interface IGetCommunityLinkByOrganisationParams {
  /** @format uuid */
  idOfOrganisation: string;
}

export type IGetCommunityLinkByOrganisationData = string;

export type IGetCommunityLinkByOrganisationError = string;

export interface IGetChatLinkByActivityParams {
  /** @format uuid */
  idOfActivity: string;
}

export type IGetChatLinkByActivityData = string;

export type IGetChatLinkByActivityError = string;

export type IGetOrganisationProfileData = IActivitiesDTO;

export type IGetOrganisationProfileError = IActivitiesDTO;

export type IGetMyActivitiesData = IActivitiesDTO;

export type IGetAllActivitiesOfAllOrganisationsData = IActivitiesDTO[];

export type IGetAllOrganisationsData = IOrganisationResponseDTO[];

export interface IGetAllActivitiesOfCurrentOrganisationParams {
  nameOfOrganisation: string;
}

export type IGetAllActivitiesOfCurrentOrganisationData = IActivitiesDTO;

export type IGetAllActivitiesOfCurrentOrganisationError = IActivitiesDTO;

export type IGetAllSubscriptionsOfVolunteerData = IOrganisationResponseDTO[];

export type IGetAllSubscriptionsOfVolunteerError = object;

export interface IFindNearbyActivitiesParams {
  nearbyActivitiesRequestDTO: INearbyActivitiesRequestDTO;
}

export type IFindNearbyActivitiesData = IActivitiesDTO[];

export type IFindNearbyActivitiesError = IActivitiesDTO[];

export type IGetAllFeedbacksAboutAllOrganisationsData = Record<
  string,
  IFeedbackResponseDTO[]
>;

export interface IGetFeedbacksAboutCurrentOrganisationParams {
  /** @format uuid */
  id: string;
}

export type IGetFeedbacksAboutCurrentOrganisationData = object;

export type IGetFeedbacksAboutCurrentOrganisationError = object;

export type IGetCurrentUserData = object;

export interface IDeleteVolunteerFromActivityParams {
  /** @format uuid */
  id: string;
}

export type IDeleteVolunteerFromActivityData = any;

export interface IDeleteActivityByIdParams {
  /** @format uuid */
  id: string;
}

export type IDeleteActivityByIdData = any;

export interface IUnsubscribeFromNotificationsByIdOfOrganisationsParams {
  /** @format uuid */
  idOfOrganisation: string;
}

export type IUnsubscribeFromNotificationsByIdOfOrganisationsData = string;

export interface IDeleteFeedbackAboutOrganisationParams {
  /** @format uuid */
  idOfFeedback: string;
}

export type IDeleteFeedbackAboutOrganisationData = string;
