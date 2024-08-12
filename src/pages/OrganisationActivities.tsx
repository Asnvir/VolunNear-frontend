import {useState} from 'react';
import {OrganisationActivitiesFiltersType} from '../api/services/activities/service/types.ts';
import {Box} from '@chakra-ui/react';
import {ActivitiesMapComponent} from '../components/activities/map/ActivitiesMapComponent.tsx';
import {ActivitiesList} from '../components/activities/list/ActivitiesList.tsx';
import {useGetOrganizationActivities} from '../hooks/activities/useGetOrganizationActivities/useGetOrganizationActivities.ts';
import {OrganisationActivitiesFilterFormWrapper} from '../components/activities/filter/OrganisationActivitiesFilterFormWrapper.tsx';

export const OrganisationActivities = () => {
  const [filters, setFilters] = useState<OrganisationActivitiesFiltersType>({
    title: '',
    type: '',
    date: '',
    country: '',
    city: '',
  });

  const handleFiltersChange = (filters: OrganisationActivitiesFiltersType) => {
    setFilters(filters);
  };

  const {data: activities = []} = useGetOrganizationActivities({filters});

  return (
    <>
      <OrganisationActivitiesFilterFormWrapper
        onChangeFilters={handleFiltersChange}
      />
      <Box w="full">
        <ActivitiesMapComponent activities={activities} />
      </Box>
      <ActivitiesList activities={activities} />
    </>
  );
};
