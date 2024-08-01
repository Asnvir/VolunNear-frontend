import {MappedCountryData} from '../../types.ts';

export type PlacesService = {
  getCountriesData(): Promise<MappedCountryData[]>;
};
