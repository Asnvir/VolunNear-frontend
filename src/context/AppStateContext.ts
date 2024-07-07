import {createContext} from 'react';
import {AppStateContextType} from './types.ts';

export const AppStateContext = createContext<AppStateContextType | undefined>(
  undefined
);
