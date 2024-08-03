import {useAppStateContext} from '../../../shared/hooks/useAppStateProvider.ts';
const useGetUserRole= () => {
  const {
    state: {user},
  } = useAppStateContext();

  return user?.role || 'guest';
};
 export default useGetUserRole;