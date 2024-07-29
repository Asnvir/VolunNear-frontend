import {UpdateVolunteerInfo, VolunteerService} from './types.ts';
import {HttpClientService} from '../http/types.ts';
import {VolunteerService} from './types.ts';
import {HttpClient} from '../../httpClient/types.ts';
import {ActivitiesFiltersType} from '../../../context/types.ts';
import {VolunteerMapperImpl} from '../../mappers/volunteer/VolunteerMapper.ts';
import {VolunteerMapper} from '../../mappers/volunteer/types.ts';

import {API_ENDPOINTS} from '../../constants.ts';
import {
  IUpdateVolunteerInfoData,
  IUpdateVolunteerInfoRequestDTO,
  IVolunteerProfileResponseDTO,
} from '../../../data-contracts.ts';
import {HttpClientImpl} from '../../httpClient/HttpClientImpl.ts';

export class VolunteerServiceImpl implements VolunteerService {
  private static instance: VolunteerServiceImpl | null = null;
  private volMapper: VolunteerMapper = VolunteerMapperImpl.getInstance();
  private httpClient: HttpClient = HttpClientImpl.getInstance();

  private constructor() {
  }

  public static getInstance(): VolunteerServiceImpl {
    if (!VolunteerServiceImpl.instance) {
      VolunteerServiceImpl.instance = new VolunteerServiceImpl();
    }
    return VolunteerServiceImpl.instance;
  }

  public updateVolunteerPreferences(
    filters: ActivitiesFiltersType,
  ): Promise<ActivitiesFiltersType> {
    const preferencesDTO = this.volMapper.preferencesToDTO(filters);

    return preferencesDTO;
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
}
