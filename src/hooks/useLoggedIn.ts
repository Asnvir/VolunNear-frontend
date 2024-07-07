import {useAppStateContext} from '../shared/hooks/useAppStateProvider.ts';

export const useLoggedIn = () => {
  const {
    state: {user},
  } = useAppStateContext();

  return !!user;
};
