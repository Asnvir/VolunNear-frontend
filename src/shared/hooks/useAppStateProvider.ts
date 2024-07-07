import {useContext} from 'react';
import {AppStateContext} from '../../context/AppStateContext.ts';

export const useAppStateContext = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error(
      'useAppStateContext must be used within a AppStateProvider'
    );
  }
  return context;
};
