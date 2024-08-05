import {
  Organization,
  OrganizationDTO,
  OrganizationFiltersType,
  OrganizationService,
  OrganizationsTitles,
} from './types.ts';
import {HttpClient} from '../../httpClient/types.ts';
import {HttpClientImpl} from '../../httpClient/HttpClientImpl.ts';

export class OrganizationServiceImpl implements OrganizationService {
  private static instance: OrganizationServiceImpl | null = null;
  private httpClient: HttpClient = HttpClientImpl.getInstance();

  private constructor() {}

  public static getInstance(): OrganizationServiceImpl {
    if (!OrganizationServiceImpl.instance) {
      OrganizationServiceImpl.instance = new OrganizationServiceImpl();
    }
    return OrganizationServiceImpl.instance;
  }

  public async getOrganizations(
    filters: OrganizationFiltersType
  ): Promise<Organization[]> {
    const queryParams = this.getQueryParams(filters);
    const {data: organizationsDTO} = await this.httpClient.get<
      OrganizationDTO[]
    >('/api/v1/organisation/get_all', queryParams);

    return organizationsDTO.map(this.organizationFromDTO);
  }

  private organizationFromDTO(organizationDTO: OrganizationDTO): Organization {
    return {
      id: organizationDTO.id,
      nameOfOrganisation: organizationDTO.nameOfOrganisation,
      country: organizationDTO.country,
      city: organizationDTO.city,
      address: organizationDTO.address,
      avatarUrl: organizationDTO.avatarUrl,
    };
  }

  private getQueryParams(filters: OrganizationFiltersType) {
    const filtersDTO = {
      nameOfOrganisation: filters.nameOfOrganisation || undefined,
      country: filters.country || undefined,
      city: filters.city || undefined,
    };

    return this.cleanFilters(filtersDTO);
  }

  private cleanFilters(filtersDTO: {
    nameOfOrganisation: string | undefined;
    country: string | undefined;
    city: string | undefined;
  }): Partial<OrganizationFiltersType> {
    return Object.fromEntries(
      Object.entries(filtersDTO).filter(([, value]) => value !== undefined)
    );
  }

  public async getOrganizationsTitles(): Promise<OrganizationsTitles> {
    const organizations = await this.getOrganizations({});
    return organizations.map(organization => organization.nameOfOrganisation);
  }
}
