import {SubmitHandler, useForm} from 'react-hook-form';
import {ActivitiesFilterValues} from '../../../api/validation/activitiesFilter/types.ts';
import {zodResolver} from '@hookform/resolvers/zod';
import {ActivitiesFilterValidationSchema} from '../../../api/validation/activitiesFilter/ActivitiesFilterValidation.ts';
import {useActivitiesFiltersContext} from '../../../shared/hooks/useActivitiesFiltersContext.ts';
import {useState} from 'react';
import {useGetActivitiesTitles} from '../useGetActivitiesTitles/useGetActivitiesTitles.ts';
import {useGetActivitiesTypes} from '../useGetActivitiesTypes/useGetActivitiesTypes.ts';
import {useGetCountriesCities} from '../../forms/useGetCountriesCities/useGetCountriesCities.ts';
import {MappedCountryData} from '../../../api/types.ts';

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
  console.log(selectedCountry, activitiesCountriesCities);
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

  const {setFilters} = useActivitiesFiltersContext();

  const {data: activitiesTitles = []} = useGetActivitiesTitles();

  const {data: activitiesTypes = []} = useGetActivitiesTypes();

  const {data: activitiesCountriesCities = []} = useGetCountriesCities();

  const selectedCountry = watch('country');

  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const onSubmit: SubmitHandler<ActivitiesFilterValues> = filters => {
    console.log({
      ...filters,
      title: filters.title?.value || '',
      type: filters.type?.value || '',
      date: filters.date ? filters.date.toISOString() : '',
      country: filters.country?.value || '',
      city: filters.city?.value || '',
    });
    setFilters({
      ...filters,
      title: filters.title?.value || '',
      type: filters.type?.value || '',
      date: filters.date ? filters.date.toISOString() : '',
      country: filters.country?.value || '',
      city: filters.city?.value || '',
    });
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  //todo outside hook emptyFormData ={};
  const handleReset = () => {
    reset({
      title: null,
      type: null,
      date: undefined,
      country: null,
      city: null,
    });
    onSubmit({
      title: null,
      type: null,
      date: undefined,
      country: null,
      city: null,
    });
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
  };
};
