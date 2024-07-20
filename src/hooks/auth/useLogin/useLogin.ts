import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useAppStateContext} from '../../../shared/hooks/useAppStateProvider.ts';
import {useMutation} from '@tanstack/react-query';
import {LoginCredentials, UseLoginProps} from './types.ts';

export const useLogin = ({onSuccess}: UseLoginProps) => {
  const {authService} = useServiceContext();
  const {setUser} = useAppStateContext();

  const mutation = useMutation({
    mutationFn: (loginCredentials: LoginCredentials) =>
      authService.login(loginCredentials),
    onSuccess: user => {
      setUser(user);
      onSuccess?.();
    },
  });

  const login = (userCredentials: LoginCredentials) => {
    mutation.mutate(userCredentials);
  };

  return {
    login,
    isLoading: mutation.isPending,
    error: mutation.error?.message,
  };
};
