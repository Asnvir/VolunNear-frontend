import {useServiceContext} from '../shared/hooks/useServiceContext.ts';
import {useAppStateContext} from '../shared/hooks/useAppStateProvider.ts';
import {useMutation} from '@tanstack/react-query';

type LoginCredentials = {
  username: string;
  password: string;
};

type UseLoginProps = {
  onSuccess?: () => void;
};

export const useLogin = ({onSuccess}: UseLoginProps) => {
  const {authService} = useServiceContext();
  const {setUser} = useAppStateContext();

  const mutation = useMutation({
    mutationFn: ({username, password}: LoginCredentials) =>
      authService.login({username, password}),
    onSuccess: user => {
      setUser(user);
      onSuccess?.();
    },
  });

  const login = (username: string, password: string) => {
    mutation.mutate({username, password});
  };

  return {
    login,
    isLoading: mutation.isPending,
    error: mutation.error?.message,
  };
};
