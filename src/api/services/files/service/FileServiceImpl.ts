import {FileUploadService} from './types.ts';
import {API_ENDPOINTS} from '../../../constants.ts';
import { HttpClientImpl } from '../../../httpClient/HttpClientImpl.ts';
import { HttpClient } from '../../../httpClient/types.ts';


export class FileUploadServiceImpl implements FileUploadService {
  private static instance: FileUploadServiceImpl | null = null;
  private httpClient: HttpClient = HttpClientImpl.getInstance();

  private constructor() {
  }

  public static getInstance(): FileUploadServiceImpl {
    if (!FileUploadServiceImpl.instance) {
      FileUploadServiceImpl.instance = new FileUploadServiceImpl();
    }
    return FileUploadServiceImpl.instance;
  }


  public async uploadVolunteerAvatar(file: FormData, volunteerId: string): Promise<string> {
    const {data: avatarUrl} = await this.httpClient.post<string, FormData>(
      API_ENDPOINTS.UPLOAD_VOLUNTEER_AVATAR + "/" + volunteerId,
      file
    )
    return avatarUrl;
  }

  public async uploadOrganisationAvatar(file: FormData, organisationId: string): Promise<string> {
    const {data: avatarUrl} = await this.httpClient.post<string, FormData>(
      API_ENDPOINTS.UPLOAD_ORGANISATION_AVATAR + "/" + organisationId,
      file
    )
    return avatarUrl;
  }

  public async uploadActivityCoverImage(file: FormData, activityId: string): Promise<string> {
    const {data: imageUrl} = await this.httpClient.post<string, FormData>(
      API_ENDPOINTS.UPLOAD_ACTIVITY_COVER_IMAGE + "/" + activityId,
      file
    )
    return imageUrl;
  }

  public async uploadActivityGalleryImages(file: FormData, activityId: string): Promise<string[]> {
    const {data: imageUrls} = await this.httpClient.post<string[], FormData>(
      API_ENDPOINTS.UPLOAD_ACTIVITY_GALLERY_IMAGES + "/" + activityId,
      file
    )
    return imageUrls;
  }
}
