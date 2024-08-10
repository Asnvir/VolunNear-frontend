import * as z from 'zod';
import {MappedCountryData} from '../../../api/types.ts';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {ActivitiesFilterValues} from '../useActivitiesFilterForm/useActivitiesFilterForm.tsx';
import {useState} from 'react';
import {OrganisationActivitiesFiltersType} from '../../../api/services/activities/service/types.ts';
import {useGetVolunteerActivitiesTypes} from '../useGetVolunteerActivitiesTypes/useGetVolunteerActivitiesTypes.ts';
import {useGetCountriesCities} from '../../forms/useGetCountriesCities/useGetCountriesCities.ts';
import {format} from 'date-fns';
import {useGetOrganizationActivitiesTitles} from '../useGetOrganizationActivitiesTitles/useGetOrganizationActivitiesTitles.ts';

export const OrganisationsActivitiesFilterValidationSchema = z.object({
  title: z.object({label: z.string(), value: z.string()}).optional().nullable(),
  type: z.object({label: z.string(), value: z.string()}).optional().nullable(),
  date: z.date().optional().nullable(),
  country: z
    .object({label: z.string(), value: z.string()})
    .optional()
    .nullable(),
  city: z.object({label: z.string(), value: z.string()}).optional().nullable(),
});

export type OrganisationsActivitiesFilterValues = z.infer<
  typeof OrganisationsActivitiesFilterValidationSchema
>;

const createActivityTitleOption = (title: string) => ({
  label: title,
  value: title,
});

const createActivityTypeOption = (type: string) => ({
  label: type,
  value: type,
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

const emptyFormData = {
  title: null,
  type: null,
  date: undefined,
  country: null,
  city: null,
  isMyActivities: null,
};

export const emptyVolunteerActivitiesFilters = {
  title: '',
  type: '',
  date: '',
  country: '',
  city: '',
  isMyActivities: '',
};

export const emptyOrganisationActivitiesFilters = {
  title: '',
  type: '',
  date: '',
  country: '',
  city: '',
};

export const useOrganisationsActivitiesFilterForm = () => {
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: {errors, isSubmitting},
  } = useForm<OrganisationsActivitiesFilterValues>({
    resolver: zodResolver(OrganisationsActivitiesFilterValidationSchema),
  });

  const [filters, setFilters] = useState<OrganisationActivitiesFiltersType>(
    emptyOrganisationActivitiesFilters
  );
  const {data: titles = []} = useGetOrganizationActivitiesTitles();

  const {data: activitiesTypes = []} = useGetVolunteerActivitiesTypes();
  const {data: activitiesCountriesCities = []} = useGetCountriesCities();

  const selectedCountry = watch('country');

  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const onSubmit: SubmitHandler<ActivitiesFilterValues> = filters => {
    console.log('Filters being set:\n', {
      title: filters.title?.value || '',
      type: filters.type?.value || '',
      date: filters.date ? format(filters.date, 'yyyy-MM-dd') : '',
      country: filters.country?.value || '',
      city: filters.city?.value || '',
    });

    setFilters({
      title: filters.title?.value || '',
      type: filters.type?.value || '',
      date: filters.date ? format(filters.date, 'yyyy-MM-dd') : '',
      country: filters.country?.value || '',
      city: filters.city?.value || '',
    });
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  const handleReset = () => {
    reset(emptyFormData);
    onSubmit(emptyFormData);
  };

  return {
    titleOptions: titles.map(createActivityTitleOption),
    typeOptions: activitiesTypes.map(createActivityTypeOption),
    countryOptions: activitiesCountriesCities.map(createCountryOption),
    cityOptions: createCityOptions(selectedCountry, activitiesCountriesCities),
    selectedCountry,
    date,
    handleDateChange,
    handleReset,
    control,
    handleFormSubmit,
    formState: {
      errors,
      isSubmitting,
    },
    filters,
  };
};
