import {CountriesCitiesResponse} from '../../services/http/types.ts';
import {MappedCountryData} from '../../types.ts';

export type FormMapper = {
  mapCountriesData: (data: CountriesCitiesResponse) => MappedCountryData[];
};
