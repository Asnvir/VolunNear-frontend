import {MappedCountryData} from '../api/types.ts';

export class FilterFormUtil {
  static createOption(value: string) {
    return {label: value, value};
  }

  static createCityOptions(
    selectedCountry: {value: string; label: string} | null | undefined,
    activitiesCountriesCities: MappedCountryData[]
  ) {
    if (!selectedCountry || !activitiesCountriesCities) {
      return [];
    }

    const countryData = activitiesCountriesCities.find(
      country => country.country === selectedCountry.value
    );

    // Use this.createOption to call the static method
    return countryData ? countryData.cities.map(this.createOption) : [];
  }
}
