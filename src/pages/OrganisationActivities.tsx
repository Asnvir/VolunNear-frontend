import {useState} from 'react';
import {OrganisationActivitiesFiltersType} from '../api/services/activities/service/types.ts';
import {emptyOrganisationActivitiesFilters} from '../hooks/activities/useActivitiesFilterForm/useActivitiesFilterForm.tsx';
import {Box} from '@chakra-ui/react';
import {ActivitiesMapComponent} from '../components/activities/map/ActivitiesMapComponent.tsx';
import {ActivitiesList} from '../components/activities/list/ActivitiesList.tsx';
import {OrganisationActivityFilter} from '../components/activities/filter/OrganisationActivityFilter.tsx';
import {useGetOrganizationActivities} from '../hooks/activities/useGetOrganizationActivities/useGetOrganizationActivities.ts';

export const OrganisationActivities = () => {
  const [filters, setFilters] = useState<OrganisationActivitiesFiltersType>(
    emptyOrganisationActivitiesFilters
  );

  const handleFiltersChange = (filters: OrganisationActivitiesFiltersType) => {
    setFilters(filters);
  };

  const {data: activities = []} = useGetOrganizationActivities({filters});

  console.log(`Organisation activities:\n${JSON.stringify(activities)}`);

  return (
    <>
      <OrganisationActivityFilter onApply={handleFiltersChange} />
      <Box w="full">
        {/*<ActivitiesMapComponent isMyActivities={false} filters={filters} activities={activities} />*/}
        <ActivitiesMapComponent activities={activities} />
      </Box>
      {/*<ActivitiesList isMyActivities={false} filters={filters} />*/}
      <ActivitiesList activities={activities} />
    </>
  );
};
