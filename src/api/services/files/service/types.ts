

export type FileUploadService = {
  uploadVolunteerAvatar: (file: FormData, volunteerId: string) => Promise<string>;
  uploadOrganisationAvatar: (file: FormData, organisationId: string) => Promise<string>;
  uploadActivityCoverImage: (file: FormData, activityId: string) => Promise<string>;
  uploadActivityGalleryImages: (file: FormData, activityId: string) => Promise<string[]>;
};