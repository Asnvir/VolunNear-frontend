import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useAppStateContext} from '../../../shared/hooks/useAppStateProvider.ts';

export const useLoggedOut = () => {
  const {authService} = useServiceContext();
  const {setUser} = useAppStateContext()
  return async () => {
    await authService.logout();
    setUser(null);
  };
};
