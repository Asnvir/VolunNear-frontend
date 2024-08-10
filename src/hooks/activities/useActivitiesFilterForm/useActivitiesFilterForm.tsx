import {SubmitHandler, useForm} from 'react-hook-form';
import {format} from 'date-fns';
import {zodResolver} from '@hookform/resolvers/zod';
import {useState} from 'react';
import {useGetVolunteerActivitiesTitles} from '../useGetVolunteerActivitiesTitles/useGetVolunteerActivitiesTitles.ts';
import {useGetVolunteerActivitiesTypes} from '../useGetVolunteerActivitiesTypes/useGetVolunteerActivitiesTypes.ts';
import {useGetCountriesCities} from '../../forms/useGetCountriesCities/useGetCountriesCities.ts';
import {MappedCountryData} from '../../../api/types.ts';
import {ActivitiesFiltersType} from '../../../api/services/activities/service/types.ts';

import * as z from 'zod';

export const ActivitiesFilterValidationSchema = z.object({
  title: z.object({label: z.string(), value: z.string()}).optional().nullable(),
  type: z.object({label: z.string(), value: z.string()}).optional().nullable(),
  date: z.date().optional().nullable(),
  country: z
    .object({label: z.string(), value: z.string()})
    .optional()
    .nullable(),
  city: z.object({label: z.string(), value: z.string()}).optional().nullable(),
  isMyActivities: z.string().optional().nullable(),
});

export type ActivitiesFilterValues = z.infer<
  typeof ActivitiesFilterValidationSchema
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

export const useActivitiesFilterForm = () => {
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: {errors, isSubmitting},
  } = useForm<ActivitiesFilterValues>({
    resolver: zodResolver(ActivitiesFilterValidationSchema),
  });

  const [filters, setFilters] = useState<ActivitiesFiltersType>(
    emptyVolunteerActivitiesFilters
  );

  const {data: activitiesTitles = []} = useGetVolunteerActivitiesTitles();

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
      isMyActivities: filters.isMyActivities || '',
    });

    setFilters({
      title: filters.title?.value || '',
      type: filters.type?.value || '',
      date: filters.date ? format(filters.date, 'yyyy-MM-dd') : '',
      country: filters.country?.value || '',
      city: filters.city?.value || '',
      isMyActivities: filters.isMyActivities || '',
    });
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  const handleReset = () => {
    reset(emptyFormData);
    onSubmit(emptyFormData);
  };

  return {
    activitiesTitleOptions: activitiesTitles.map(createActivityTitleOption),
    activitiesTypeOptions: activitiesTypes.map(createActivityTypeOption),
    selectedCountry,
    activitiesCountryOption: activitiesCountriesCities.map(createCountryOption),
    activitiesCityOptions: createCityOptions(
      selectedCountry,
      activitiesCountriesCities
    ),
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
