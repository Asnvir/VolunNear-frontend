import React, {useEffect} from 'react';
import {useServiceContext} from '../shared/hooks/useServiceContext.tsx';
import {useAppStateContext} from '../shared/hooks/useAppStateProvider.ts';

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const {authService} = useServiceContext();
  const {setUser} = useAppStateContext();

  useEffect(() => {
    const user = authService.getCurrentUser();
    setUser(user);
  }, [authService, setUser]);

  return <>{children}</>;
};
