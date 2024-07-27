import {useContext} from 'react';
import {ActivitiesContext} from '../../context/ActivitiesContext.ts';

export const useActivitiesFiltersContext = () => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error(
      'useActivitiesFiltersContext must be used within a ActivitiesFiltersProvider'
    );
  }
  return context;
};
