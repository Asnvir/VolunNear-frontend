import {Box} from '@chakra-ui/react';
import {ActivitiesMapComponent} from '../components/activities/map/ActivitiesMapComponent.tsx';
import {ActivitiesList} from '../components/activities/list/ActivitiesList.tsx';
import {useState} from 'react';
import {ActivitiesFiltersType} from '../api/services/activities/service/types.ts';
import {useGetVolunteerActivities} from '../hooks/activities/useGetVolunteerActivities/useGetVolunteerActivities.ts';
import {VolunteerActivitiesFilterForm} from '../components/activities/filter/VolunteerActivitiesFilterForm.tsx';

export const AllActivities = () => {
  const [filters, setFilters] = useState<ActivitiesFiltersType>({
    title: '',
    type: '',
    date: '',
    country: '',
    city: '',
    isMyActivities: '',
  });

  const handleFiltersChange = (filters: ActivitiesFiltersType) => {
    setFilters(filters);
  };

  const {data: activities = []} = useGetVolunteerActivities({filters});
  // console.log(`Volunteer activities:\n${JSON.stringify(activities)}`);

  return (
    <>
      {/*<ActivitiesFilter onApply={handleFiltersChange} />*/}
      <VolunteerActivitiesFilterForm onApply={handleFiltersChange} />
      <Box w="full">
        {/*<ActivitiesMapComponent isMyActivities={false} filters={filters} />*/}
        <ActivitiesMapComponent activities={activities} />
      </Box>
      {/*<ActivitiesList isMyActivities={false} filters={filters} />*/}
      <ActivitiesList activities={activities} />
    </>
  );
};
