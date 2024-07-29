

export type FileUploadService = {
  uploadVolunteerAvatar: (file: FormData, volunteerId: string) => Promise<string>;
};