import {createContext} from 'react';
import {ActivitiesContextType} from './types.ts';

export const ActivitiesContext = createContext<ActivitiesContextType | null>(
  null
);
