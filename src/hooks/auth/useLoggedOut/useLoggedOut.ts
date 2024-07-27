import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';

export const useLoggedOut = () => {
  const {authService} = useServiceContext();
  return authService.logout;
};
