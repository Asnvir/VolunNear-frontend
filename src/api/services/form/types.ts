import {MappedCountryData} from '../../types.ts';

export type FormService = {
  getCountriesData(): Promise<MappedCountryData[]>;
};
