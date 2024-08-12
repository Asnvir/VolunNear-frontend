import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  VolunteerActivitiesFilterValidationSchema,
  VolunteerActivitiesFilterValues,
} from '../../../api/validation/activitiesFilter/VolunteerActivitiesFilterValidation.ts';
import {format} from 'date-fns';
import {VolunteerActivitiesFiltersType} from '../../../api/services/activities/service/types.ts';

type UseVolunteerActivitiesFilterFormProps = {
  onChangeFilters: (filters: VolunteerActivitiesFiltersType) => void;
};

const defaultFormData = {
  title: null,
  type: null,
  date: undefined,
  country: null,
  city: null,
  isMyActivities: '',
};

export const useVolunteerActivitiesFilterForm = ({
  onChangeFilters,
}: UseVolunteerActivitiesFilterFormProps) => {
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: {errors, isSubmitting, isDirty},
  } = useForm<VolunteerActivitiesFilterValues>({
    resolver: zodResolver(VolunteerActivitiesFilterValidationSchema),
    defaultValues: defaultFormData,
  });

  const selectedCountry = watch('country');

  const onSubmit: SubmitHandler<VolunteerActivitiesFilterValues> = filters => {
    onChangeFilters({
      title: filters.title?.value || '',
      type: filters.type?.value || '',
      date: filters.date ? format(filters.date, 'yyyy-MM-dd') : '',
      country: filters.country?.value || '',
      city: filters.city?.value || '',
      isMyActivities: filters.isMyActivities || '',
    });
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  const handleFormReset = () => {
    reset(defaultFormData);
    onSubmit(defaultFormData);
  };

  return {
    control,
    formState: {errors, isSubmitting, isAnyFilterSet: isDirty},
    selectedCountry,
    handleFormSubmit,
    handleFormReset,
  };
};
