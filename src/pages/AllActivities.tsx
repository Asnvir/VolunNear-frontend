import {ActivitiesFilter} from '../components/activities/filter/ActivitiesFilter.tsx';
import {Box} from '@chakra-ui/react';
import {ActivitiesMapComponent} from '../components/activities/map/ActivitiesMapComponent.tsx';
import {ActivitiesList} from '../components/activities/list/ActivitiesList.tsx';
import {useState} from 'react';
import {ActivitiesFiltersType} from '../api/services/activities/service/types.ts';
import {emptyVolunteerActivitiesFilters} from '../hooks/activities/useActivitiesFilterForm/useActivitiesFilterForm.tsx';
import {useGetVolunteerActivities} from '../hooks/activities/useGetVolunteerActivities/useGetVolunteerActivities.ts';

export const AllActivities = () => {
  const [filters, setFilters] = useState<ActivitiesFiltersType>(
    emptyVolunteerActivitiesFilters
  );

  const handleFiltersChange = (filters: ActivitiesFiltersType) => {
    setFilters(filters);
  };

  const {data: activities = []} = useGetVolunteerActivities({filters});
  console.log(`Volunteer activities:\n${JSON.stringify(activities)}`);

  return (
    <>
      <ActivitiesFilter onApply={handleFiltersChange} />
      <Box w="full">
        {/*<ActivitiesMapComponent isMyActivities={false} filters={filters} />*/}
        <ActivitiesMapComponent activities={activities} />
      </Box>
      {/*<ActivitiesList isMyActivities={false} filters={filters} />*/}
      <ActivitiesList activities={activities} />
    </>
  );
};
