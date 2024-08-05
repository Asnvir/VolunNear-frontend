import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  OrganizationsFilterValidationSchema,
  OrganizationsFilterValues,
} from '../../../api/validation/organizationsFilter/OrganizationsFilterValidation.ts';
import {useState} from 'react';
import {useGetCountriesCities} from '../../forms/useGetCountriesCities/useGetCountriesCities.ts';
import {useGetOrganizationsTitles} from '../useGetOrganizationsTitles/useGetOrganizationsTitles.ts';
import {OrganizationFiltersType} from '../../../api/services/organizations/types.ts';
import {MappedCountryData} from '../../../api/types.ts';

const createOrganizationTitleOption = (title: string) => ({
  label: title,
  value: title,
});

const createCountryOption = (country: MappedCountryData) => ({
  label: country.country,
  value: country.country,
});

const createCityOptions = (
  selectedCountry: {value: string; label: string} | null | undefined,
  activitiesCountriesCities: MappedCountryData[]
) => {
  if (!selectedCountry || !activitiesCountriesCities) {
    return [];
  }

  const countryData = activitiesCountriesCities.find(
    country => country.country === selectedCountry.value
  );

  return countryData
    ? countryData.cities.map(city => ({
        label: city,
        value: city,
      }))
    : [];
};

export const emptyFormData = {
  country: null,
  city: null,
  title: null,
};

export const emptyOrganizationFilters = {
  country: '',
  city: '',
  title: '',
};

export const useOrganizationsFilterForm = () => {
  const {
    handleSubmit,
    watch,
    control,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<OrganizationsFilterValues>({
    resolver: zodResolver(OrganizationsFilterValidationSchema),
  });

  const [filters, setFilters] = useState<OrganizationFiltersType>(
    emptyOrganizationFilters
  );

  const {data: organizationTitles = []} = useGetOrganizationsTitles({filters});
  const {data: countriesCities = []} = useGetCountriesCities();
  const selectedCountry = watch('country');

  const onSubmit: SubmitHandler<OrganizationsFilterValues> = filters => {
    const filtersDTO: OrganizationFiltersType = {
      nameOfOrganisation: filters.title?.value ?? undefined,
      country: filters.country?.value ?? undefined,
      city: filters.city?.value ?? undefined,
    };
    setFilters(filtersDTO);
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  const handleReset = () => {
    reset(emptyFormData);
    onSubmit(emptyFormData);
  };

  return {
    titleOptions: organizationTitles.map(createOrganizationTitleOption),
    countryOptions: countriesCities.map(createCountryOption),
    selectedCountry,
    cityOptions: createCityOptions(selectedCountry, countriesCities),
    control,
    handleFormSubmit,
    handleReset,
    formState: {
      errors,
      isSubmitting,
    },
    filters,
  };
};
