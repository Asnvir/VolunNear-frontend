import {Box} from '@chakra-ui/react';
import {ActivitiesMapComponent} from '../components/activities/map/ActivitiesMapComponent.tsx';
import {ActivitiesList} from '../components/activities/list/ActivitiesList.tsx';
import {useState} from 'react';
import {VolunteerActivitiesFiltersType} from '../api/services/activities/service/types.ts';
import {useGetVolunteerActivities} from '../hooks/activities/useGetVolunteerActivities/useGetVolunteerActivities.ts';
import {VolunteerActivitiesFilterFormWrapper} from '../components/activities/filter/VolunteerActivitiesFilterFormWrapper.tsx';
import {DEFAULT_ACTIVITIES_PAGINATION_SIZE} from '../utils/constants/defaultActivitiesPagingValues.ts';
import {LoadMoreButton} from '../components/activities/activityDetails/LoadMoreButton.tsx';

const emptyFilters: VolunteerActivitiesFiltersType = {
  title: '',
  type: '',
  date: '',
  country: '',
  city: '',
  isMyActivities: '',
};

export const AllActivities = () => {
  const [filters, setFilters] =
    useState<VolunteerActivitiesFiltersType>(emptyFilters);

  const handleFiltersChange = (filters: VolunteerActivitiesFiltersType) => {
    setFilters(filters);
  };

  const {
    data: activities,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetVolunteerActivities({
    filters,
    size: DEFAULT_ACTIVITIES_PAGINATION_SIZE,
  });

  return (
    <>
      <VolunteerActivitiesFilterFormWrapper
        onChangeFilters={handleFiltersChange}
      />

      <Box w="full">
        <ActivitiesMapComponent activities={activities} />
      </Box>
      <ActivitiesList activities={activities} />

      <LoadMoreButton
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
};
