

export type FileUploadService = {
  uploadVolunteerAvatar: (file: File) => Promise<string>;
};