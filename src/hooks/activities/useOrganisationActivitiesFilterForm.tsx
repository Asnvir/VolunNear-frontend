import {OrganisationActivitiesFiltersType} from '../../api/services/activities/service/types.ts';
import {SubmitHandler, useForm} from 'react-hook-form';
import {VolunteerActivitiesFilterValues} from '../../api/validation/activitiesFilter/VolunteerActivitiesFilterValidation.ts';
import {zodResolver} from '@hookform/resolvers/zod';
import {OrganisationActivitiesFilterValidationSchema} from '../../api/validation/activitiesFilter/OrganisationActivitiesFilterValidation.ts';
import {format} from 'date-fns';

type UseOrganisationActivitiesFilterFormProps = {
  onChangeFilters: (filters: OrganisationActivitiesFiltersType) => void;
};

const defaultFormData = {
  title: null,
  type: null,
  date: undefined,
  country: null,
  city: null,
};

export const useOrganisationActivitiesFilterForm = ({
  onChangeFilters,
}: UseOrganisationActivitiesFilterFormProps) => {
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: {errors, isSubmitting, isDirty},
  } = useForm<VolunteerActivitiesFilterValues>({
    resolver: zodResolver(OrganisationActivitiesFilterValidationSchema),
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
