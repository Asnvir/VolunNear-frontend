import {ActivitiesFilter} from '../components/activities/filter/ActivitiesFilter.tsx';
import {Box} from '@chakra-ui/react';
import {ActivitiesMapComponent} from '../components/activities/map/ActivitiesMapComponent.tsx';
import {ActivitiesList} from '../components/activities/list/ActivitiesList.tsx';
import {useState} from 'react';
import {ActivitiesFiltersType} from '../api/services/activities/service/types.ts';
import {emptyFilters} from '../hooks/activities/useActivitiesFilterForm/useActivitiesFilterForm.tsx';

export const AllEvents = () => {
  const [filters, setFilters] = useState<ActivitiesFiltersType>(emptyFilters);

  const handleFiltersChange = (filters: ActivitiesFiltersType) => {
    setFilters(filters);
  };

  return (
    <>
      <ActivitiesFilter onApply={handleFiltersChange} />
      <Box w="full">
        <ActivitiesMapComponent isMyActivities={false} filters={filters} />
      </Box>
      <ActivitiesList isMyActivities={false} filters={filters} />
    </>
  );
};
