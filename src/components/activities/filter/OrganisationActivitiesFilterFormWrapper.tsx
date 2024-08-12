import {OrganisationActivitiesFiltersType} from '../../../api/services/activities/service/types.ts';
import {FilterFormUtil} from '../../../utils/FilterFormUtil.ts';
import {useGetOrganizationActivitiesTitles} from '../../../hooks/activities/useGetOrganizationActivitiesTitles/useGetOrganizationActivitiesTitles.ts';
import {useGetActivitiesTypes} from '../../../hooks/activities/useGetVolunteerActivitiesTypes/useGetActivitiesTypes.ts';
import {beautifyActivityType} from '../../../utils/kindToButyType.ts';
import {useGetCountriesCities} from '../../../hooks/forms/useGetCountriesCities/useGetCountriesCities.ts';
import {useOrganisationActivitiesFilterForm} from '../../../hooks/activities/useOrganisationActivitiesFilterForm.tsx';
import {OrganisationActivitiesFilterForm} from './OrganisationActivitiesFilterForm.tsx';

type OrganisationActivitiesFilterFormWrapperProps = {
  onChangeFilters: (filters: OrganisationActivitiesFiltersType) => void;
};

export const OrganisationActivitiesFilterFormWrapper = ({
  onChangeFilters,
}: OrganisationActivitiesFilterFormWrapperProps) => {
  const {
    control,
    formState: {errors, isSubmitting, isAnyFilterSet},
    selectedCountry,
    handleFormSubmit,
    handleFormReset,
  } = useOrganisationActivitiesFilterForm({onChangeFilters});

  const {data: titles = []} = useGetOrganizationActivitiesTitles();
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
  return (
    <OrganisationActivitiesFilterForm
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
      isVisibleResetButton={isAnyFilterSet}
    />
  );
};
