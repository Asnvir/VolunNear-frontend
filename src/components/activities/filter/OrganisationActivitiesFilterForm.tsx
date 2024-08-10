import {OrganisationActivitiesFiltersType} from '../../../api/services/activities/service/types.ts';
import {useActivitiesFilterForm} from '../../../hooks/activities/useActivitiesFilterForm/useActivitiesFilterForm.tsx';
import {useGetOrganizationsTitles} from '../../../hooks/organizations/useGetOrganizationsTitles/useGetOrganizationsTitles.ts';
import {FilterFormUtil} from '../../../utils/FilterFormUtil.ts';
import {useGetActivitiesTypes} from '../../../hooks/activities/useGetVolunteerActivitiesTypes/useGetActivitiesTypes.ts';
import {beautifyActivityType} from '../../../utils/kindToButyType.ts';
import {useGetCountriesCities} from '../../../hooks/forms/useGetCountriesCities/useGetCountriesCities.ts';
import {useEffect} from 'react';
import {FilterForm} from './FilterForm.tsx';

type OrganisationActivitiesFilterFormProps = {
  onApply: (filters: OrganisationActivitiesFiltersType) => void;
};

export const OrganisationActivitiesFilterForm = ({
  onApply,
}: OrganisationActivitiesFilterFormProps) => {
  const {
    filters,
    selectedCountry,
    control,
    handleFormSubmit,
    handleFormReset,
    formState: {errors, isSubmitting},
    isAnyFilterSet,
  } = useActivitiesFilterForm({
    enabledMyActivitiesForVolunteerActivities: false,
  });

  const {data: titles = []} = useGetOrganizationsTitles({filters});
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
      hasMyActivities={false}
      isAnyFilterSet={isAnyFilterSet}
    />
  );
};
