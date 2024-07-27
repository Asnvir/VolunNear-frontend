import {ReactNode, useState} from 'react';
import {ActivitiesContext} from '../context/ActivitiesContext.ts';
import {ActivitiesFiltersType} from '../api/services/activities/service/types.ts';

const EMPTY_FILTERS: ActivitiesFiltersType = {
  title: '',
  date: '',
  type: '',
  city: '',
  country: '',
};

type ActivitiesFiltersProviderProps = {
  children: ReactNode;
};

export const ActivitiesFiltersProvider = ({
  children,
}: ActivitiesFiltersProviderProps) => {
  const [filters, setFilters] = useState<ActivitiesFiltersType>(EMPTY_FILTERS);

  return (
    <ActivitiesContext.Provider value={{filters, setFilters}}>
      {children}
    </ActivitiesContext.Provider>
  );
};
