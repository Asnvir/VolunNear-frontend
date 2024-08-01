import {FormMapper} from './types.ts';
import {CountriesCitiesResponse} from '../../httpClient/types.ts';
import {MappedCountryData} from '../../types.ts';

export class FormMapperImpl implements FormMapper {
  private static instance: FormMapperImpl | null = null;

  private constructor() {}

  public static getInstance(): FormMapperImpl {
    if (!FormMapperImpl.instance) {
      FormMapperImpl.instance = new FormMapperImpl();
    }
    return FormMapperImpl.instance;
  }

  public mapCountriesData(data: CountriesCitiesResponse): MappedCountryData[] {
    return data.data.map(country => ({
      country: country.country,
      cities: country.cities,
    }));
  }
}
