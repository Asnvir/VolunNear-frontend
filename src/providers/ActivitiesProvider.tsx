import {ReactNode, useState} from 'react';
import {ActivitiesContext} from '../context/ActivitiesContext.ts';
import {VolunteerActivitiesFiltersType} from '../api/services/activities/service/types.ts';

const EMPTY_FILTERS: VolunteerActivitiesFiltersType = {
  title: '',
  date: '',
  type: '',
  city: '',
  country: '',
};

type ActivitiesProviderProps = {
  children: ReactNode;
};

export const ActivitiesProvider = ({children}: ActivitiesProviderProps) => {
  const [filters, setFilters] =
    useState<VolunteerActivitiesFiltersType>(EMPTY_FILTERS);

  return (
    <ActivitiesContext.Provider value={{filters, setFilters}}>
      {children}
    </ActivitiesContext.Provider>
  );
};
