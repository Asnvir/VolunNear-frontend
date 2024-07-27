import {useContext} from 'react';
import {ActivitiesContext} from '../../context/ActivitiesContext.ts';

export const useActivitiesContext = () => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error(
      'useActivitiesContext must be used within a ActivitiesProvider'
    );
  }
  return context;
};
