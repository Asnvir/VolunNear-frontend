import {SubmitHandler, useForm} from 'react-hook-form';
import {format} from 'date-fns';
import {ActivitiesFilterValues} from '../../../api/validation/activitiesFilter/types.ts';
import {zodResolver} from '@hookform/resolvers/zod';
import {ActivitiesFilterValidationSchema} from '../../../api/validation/activitiesFilter/ActivitiesFilterValidation.ts';
import {useState} from 'react';
import {useGetActivitiesTitles} from '../useGetActivitiesTitles/useGetActivitiesTitles.ts';
import {useGetActivitiesTypes} from '../useGetActivitiesTypes/useGetActivitiesTypes.ts';
import {useGetCountriesCities} from '../../forms/useGetCountriesCities/useGetCountriesCities.ts';
import {MappedCountryData} from '../../../api/types.ts';
import {ActivitiesFiltersType} from '../../../api/services/activities/service/types.ts';

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

export const emptyFilters = {
  title: '',
  type: '',
  date: '',
  country: '',
  city: '',
  isMyActivities: '',
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

  const [filters, setFilters] = useState<ActivitiesFiltersType>(emptyFilters);

  const {data: activitiesTitles = []} = useGetActivitiesTitles();

  const {data: activitiesTypes = []} = useGetActivitiesTypes();

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
