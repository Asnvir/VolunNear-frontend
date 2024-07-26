import {FormMapperImpl} from '../../mappers/form/FormMapperImpl.ts';
import {FormMapper} from '../../mappers/form/types.ts';
import {FormService} from './types.ts';
import {MappedCountryData} from '../../types.ts';
import {CountriesCitiesResponse, HttpClientService} from '../http/types.ts';
import {HttpClientImpl} from '../http/HttpClientImpl.ts';

export class FormServiceImpl implements FormService {
  private static instance: FormServiceImpl | null = null;
  private formMapper: FormMapper = FormMapperImpl.getInstance();
  private httpClient: HttpClientService = HttpClientImpl.getInstance();

  private constructor() {}

  public static getInstance(): FormServiceImpl {
    if (!FormServiceImpl.instance) {
      FormServiceImpl.instance = new FormServiceImpl();
    }
    return FormServiceImpl.instance;
  }

  public async getCountriesData(): Promise<MappedCountryData[]> {
    const response = await this.httpClient.get<CountriesCitiesResponse>(
      'https://countriesnow.space/api/v0.1/countries'
    );
    const countriesData = this.formMapper.mapCountriesData(response.data);
    return countriesData;
  }
}
