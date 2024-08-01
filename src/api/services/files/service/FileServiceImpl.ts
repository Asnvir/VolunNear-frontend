import {FileUploadService} from './types.ts';
import {VolunteerServiceImpl} from '../../volunteer/VolunteerServiceImpl.ts';

import {
  IUpdateVolunteerInfoData,
  IUpdateVolunteerInfoRequestDTO,
} from '../../../../data-contracts.ts';
import {API_ENDPOINTS} from '../../../constants.ts';
import {UpdateVolunteerInfo} from '../../volunteer/types.ts';
import { HttpClientImpl } from '../../../httpClient/HttpClientImpl.ts';
import { HttpClient } from '../../../httpClient/types.ts';


export class FileUploadServiceImpl implements FileUploadService {
  private static instance: FileUploadServiceImpl | null = null;
  private httpClient: HttpClient = HttpClientImpl.getInstance();

  private constructor() {
  }

  public static getInstance(): VolunteerServiceImpl {
    if (!FileUploadServiceImpl.instance) {
      FileUploadServiceImpl.instance = new FileUploadServiceImpl();
    }
    return FileUploadServiceImpl.instance;
  }



  public async updateVolunteerProfile(updateVolunteerInfo: UpdateVolunteerInfo): Promise<IUpdateVolunteerInfoRequestDTO> {
    const updateVolunteerInfoDTO = this.volMapper.updateVolunteerInfoToDTO(updateVolunteerInfo);
    const {data: updatedVolunteerInfoDTO} = await this.httpClient.put<
      IUpdateVolunteerInfoData,
      IUpdateVolunteerInfoRequestDTO
    >(API_ENDPOINTS.UPDATE_VOLUNTEER_PROFILE, updateVolunteerInfoDTO);
    return updateVolunteerInfoDTO;
  }

  public async uploadVolunteerAvatar(file: FormData, volunteerId: string): Promise<string> {
    const {data: avatarUrl} = await this.httpClient.post<string, FormData>(
      API_ENDPOINTS.UPLOAD_VOLUNTEER_AVATAR + "/" + volunteerId,
      file
    )
    return avatarUrl;
  }
}
