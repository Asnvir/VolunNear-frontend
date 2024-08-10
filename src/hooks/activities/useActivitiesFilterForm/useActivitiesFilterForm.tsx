import {SubmitHandler, useForm} from 'react-hook-form';
import {
  GenericActivitiesFilterValidationSchema,
  GenericActivitiesFilterValues,
} from './types.ts';
import {zodResolver} from '@hookform/resolvers/zod';
import {useState} from 'react';
import {format} from 'date-fns';
import {mapToActivityType} from '../../../utils/kindToButyType.ts';

type UseActivitiesFilterFormProps = {
  enabledMyActivitiesForVolunteerActivities: boolean;
};

export const useActivitiesFilterForm = ({
  enabledMyActivitiesForVolunteerActivities,
}: UseActivitiesFilterFormProps) => {
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: {errors, isSubmitting},
  } = useForm<GenericActivitiesFilterValues>({
    resolver: zodResolver(GenericActivitiesFilterValidationSchema),
  });

  const emptyFilters = enabledMyActivitiesForVolunteerActivities
    ? {
        title: '',
        type: '',
        date: '',
        country: '',
        city: '',
        isMyActivities: '',
      }
    : {
        title: '',
        type: '',
        date: '',
        country: '',
        city: '',
      };

  const emptyFormData = enabledMyActivitiesForVolunteerActivities
    ? {
        title: null, // Убедитесь, что используется null
        type: null, // Убедитесь, что используется null
        date: undefined, // Оставьте undefined для DatePicker
        country: null, // Убедитесь, что используется null
        city: null, // Убедитесь, что используется null
        isMyActivities: '', // Здесь используйте пустую строку
      }
    : {
        title: null,
        type: null,
        date: undefined,
        country: null,
        city: null,
      };

  const [filters, setFilters] = useState(emptyFilters);

  const isAnyFilterSet = enabledMyActivitiesForVolunteerActivities
    ? !!(
        filters.title ||
        filters.type ||
        filters.date ||
        filters.country ||
        filters.city ||
        filters.isMyActivities === 'true'
      )
    : !!(
        filters.title ||
        filters.type ||
        filters.date ||
        filters.country ||
        filters.city
      );

  const selectedCountry = watch('country');

  const onSubmit: SubmitHandler<GenericActivitiesFilterValues> = filters => {
    console.log(
      `Filters being set:\n${JSON.stringify({
        title: filters.title?.value || '',
        type: (filters.type?.value || '').toUpperCase(),
        date: filters.date ? format(filters.date, 'yyyy-MM-dd') : '',
        country: filters.country?.value || '',
        city: filters.city?.value || '',
        isMyActivities: filters.isMyActivities || '',
      })}`
    );

    setFilters({
      title: filters.title?.value || '',
      type: mapToActivityType(filters.type?.value || ''),
      date: filters.date ? format(filters.date, 'yyyy-MM-dd') : '',
      country: filters.country?.value || '',
      city: filters.city?.value || '',
      isMyActivities: filters.isMyActivities || '',
    });
  };

  const handleFormSubmit = handleSubmit(onSubmit);
  const handleFormReset = () => {
    reset(emptyFormData);
    onSubmit(emptyFormData);
  };

  return {
    filters,
    selectedCountry,
    // date,
    control,
    // handleDateChange,
    handleFormSubmit,
    handleFormReset,
    formState: {
      errors,
      isSubmitting,
    },
    isAnyFilterSet,
  };
};
