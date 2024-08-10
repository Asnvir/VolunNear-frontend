import {useGetVolunteerActivitiesTitles} from '../../../hooks/activities/useGetVolunteerActivitiesTitles/useGetVolunteerActivitiesTitles.ts';
import {useGetActivitiesTypes} from '../../../hooks/activities/useGetVolunteerActivitiesTypes/useGetActivitiesTypes.ts';
import {useGetCountriesCities} from '../../../hooks/forms/useGetCountriesCities/useGetCountriesCities.ts';
import {useActivitiesFilterForm} from '../../../hooks/activities/useActivitiesFilterForm/useActivitiesFilterForm.tsx';
import {FilterForm} from './FilterForm.tsx';
import {useEffect} from 'react';
import {ActivitiesFiltersType} from '../../../api/services/activities/service/types.ts';
import {FilterFormUtil} from '../../../utils/FilterFormUtil.ts';
import {beautifyActivityType} from '../../../utils/kindToButyType.ts';

type VolunteerActivitiesFilterFormProps = {
  onApply: (filters: ActivitiesFiltersType) => void;
};

export const VolunteerActivitiesFilterForm = ({
  onApply,
}: VolunteerActivitiesFilterFormProps) => {
  const {
    filters,
    selectedCountry,
    control,
    handleFormSubmit,
    handleFormReset,
    formState: {errors, isSubmitting},
    isAnyFilterSet,
  } = useActivitiesFilterForm({
    enabledMyActivitiesForVolunteerActivities: true,
  });

  const {data: titles = []} = useGetVolunteerActivitiesTitles();
  const titleOptions = titles.map(FilterFormUtil.createOption);

  const {data: types = []} = useGetActivitiesTypes();
  const beautifiedTypes = types.map(type => beautifyActivityType(type));
  const typeOptions = beautifiedTypes.map(FilterFormUtil.createOption);

  const {data: countriesCities = []} = useGetCountriesCities();
  const countryOptions = countriesCities.map(({country}) =>
    FilterFormUtil.createOption(country)
  );

  const cityOptions = FilterFormUtil.createCityOptions(
    selectedCountry,
    countriesCities
  );

  useEffect(() => {
    onApply(filters);
  }, [filters, onApply]);

  return (
    <FilterForm
      control={control}
      titleOptions={titleOptions}
      typeOptions={typeOptions}
      countryOptions={countryOptions}
      cityOptions={cityOptions}
      selectedCountry={selectedCountry}
      handleFormSubmit={handleFormSubmit}
      handleFormReset={handleFormReset}
      errors={errors}
      isSubmitting={isSubmitting}
      hasMyActivities={true}
      isAnyFilterSet={isAnyFilterSet}
    />
  );
};
