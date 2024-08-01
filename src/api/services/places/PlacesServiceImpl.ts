import {FormMapperImpl} from '../../mappers/form/FormMapperImpl.ts';
import {FormMapper} from '../../mappers/form/types.ts';
import {PlacesService} from './types.ts';
import {MappedCountryData} from '../../types.ts';
import {CountriesCitiesResponse, HttpClient} from '../../httpClient/types.ts';
import {HttpClientImpl} from '../../httpClient/HttpClientImpl.ts';

export class PlacesServiceImpl implements PlacesService {
  private static instance: PlacesServiceImpl | null = null;
  private formMapper: FormMapper = FormMapperImpl.getInstance();
  private httpClient: HttpClient = HttpClientImpl.getInstance();

  private constructor() {}

  public static getInstance(): PlacesServiceImpl {
    if (!PlacesServiceImpl.instance) {
      PlacesServiceImpl.instance = new PlacesServiceImpl();
    }
    return PlacesServiceImpl.instance;
  }

  public async getCountriesData(): Promise<MappedCountryData[]> {
    const response = await this.httpClient.get<CountriesCitiesResponse>(
      'https://countriesnow.space/api/v0.1/countries'
    );
    const countriesData = this.formMapper.mapCountriesData(response.data);
    return countriesData;
  }
}
