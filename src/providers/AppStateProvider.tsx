import React, {useCallback, useState} from 'react';
import {AppState} from '../context/types.ts';
import {AppStateContext} from '../context/AppStateContext.ts';
import {User} from '../api/types.ts';

type AppStateProviderProps = {
  children: React.ReactNode;
};

const initialState = {
  user: null,
};

export const AppStateProvider = ({children}: AppStateProviderProps) => {
  const [state, setState] = useState<AppState>(initialState);
  const setUser = useCallback((user: User | null) => setState({user}), []);

  return (
    <AppStateContext.Provider value={{state, setUser}}>
      {children}
    </AppStateContext.Provider>
  );
};
