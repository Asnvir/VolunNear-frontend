import {FileUploadService} from './types.ts';
import {VolunteerServiceImpl} from '../../volunteer/VolunteerServiceImpl.ts';
import {VolunteerMapper} from '../../../mappers/volunteer/types.ts';
import {VolunteerMapperImpl} from '../../../mappers/volunteer/VolunteerMapper.ts';
import {HttpClientService} from '../../http/types.ts';
import {HttpClientImpl} from '../../http/HttpClientImpl.ts';
import {ActivitiesFiltersType} from '../../activities/service/types.ts';
import {
  IUpdateVolunteerInfoData,
  IUpdateVolunteerInfoRequestDTO,
  IVolunteerProfileResponseDTO,
} from '../../../../data-contracts.ts';
import {API_ENDPOINTS} from '../../../constants.ts';
import {UpdateVolunteerInfo} from '../../volunteer/types.ts';


export class FileUploadServiceImpl implements FileUploadService {
  private static instance: FileUploadServiceImpl | null = null;
  private httpClient: HttpClientService = HttpClientImpl.getInstance();

  private constructor() {
  }

  public static getInstance(): VolunteerServiceImpl {
    if (!FileUploadServiceImpl.instance) {
      FileUploadServiceImpl.instance = new FileUploadServiceImpl();
    }
    return FileUploadServiceImpl.instance;
  }


  public async getVolunteerProfile(): Promise<IVolunteerProfileResponseDTO> {
    const {data: volunteerProfileDTO} = await this.httpClient.get<
      IVolunteerProfileResponseDTO
    >(API_ENDPOINTS.VOLUNTEER_PROFILE);
    return volunteerProfileDTO;
  }

  public async updateVolunteerProfile(updateVolunteerInfo: UpdateVolunteerInfo): Promise<IUpdateVolunteerInfoRequestDTO> {
    const updateVolunteerInfoDTO = this.volMapper.updateVolunteerInfoToDTO(updateVolunteerInfo);
    const {data: updatedVolunteerInfoDTO} = await this.httpClient.put<
      IUpdateVolunteerInfoData,
      IUpdateVolunteerInfoRequestDTO
    >(API_ENDPOINTS.UPDATE_VOLUNTEER_PROFILE, updateVolunteerInfoDTO);
    return updateVolunteerInfoDTO;
  }

  uploadVolunteerAvatar(file: File): Promise<string> {
    return Promise.resolve('');
  }
}
