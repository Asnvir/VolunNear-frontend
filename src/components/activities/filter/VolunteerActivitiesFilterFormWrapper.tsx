import {useVolunteerActivitiesFilterForm} from '../../../hooks/activities/useVolunteerActivitiesFilterForm/useVolunteerActivitiesFilterForm.tsx';
import {VolunteerActivitiesFiltersType} from '../../../api/services/activities/service/types.ts';
import {useGetVolunteerActivitiesTitles} from '../../../hooks/activities/useGetVolunteerActivitiesTitles/useGetVolunteerActivitiesTitles.ts';
import {FilterFormUtil} from '../../../utils/FilterFormUtil.ts';
import {useGetActivitiesTypes} from '../../../hooks/activities/useGetVolunteerActivitiesTypes/useGetActivitiesTypes.ts';
import {beautifyActivityType} from '../../../utils/kindToButyType.ts';
import {useGetCountriesCities} from '../../../hooks/forms/useGetCountriesCities/useGetCountriesCities.ts';
import {VolunteerActivitiesFilterForm} from './VolunteerActivitiesFilterForm.tsx';

type VolunteerActivitiesFilterFormWrapperProps = {
  onChangeFilters: (filters: VolunteerActivitiesFiltersType) => void;
};

export const VolunteerActivitiesFilterFormWrapper = ({
  onChangeFilters,
}: VolunteerActivitiesFilterFormWrapperProps) => {
  const {
    control,
    formState: {errors, isSubmitting, isAnyFilterSet},
    selectedCountry,
    handleFormSubmit,
    handleFormReset,
  } = useVolunteerActivitiesFilterForm({onChangeFilters});

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

  return (
    <VolunteerActivitiesFilterForm
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
