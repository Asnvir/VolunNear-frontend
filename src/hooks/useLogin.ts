import {useServiceContext} from '../shared/hooks/useServiceContext.tsx';
import {useCallback, useState} from 'react';
import {useAppStateContext} from '../shared/hooks/useAppStateProvider.ts';

type UseLoginProps = {
  onSuccess?: () => void;
};

export const useLogin = ({onSuccess}: UseLoginProps) => {
  const {authService} = useServiceContext();
  const {setUser} = useAppStateContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (username: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const user = await authService.login({username, password});
        setUser(user);
        setIsLoading(false);
        onSuccess?.();
      } catch (error) {
        setIsLoading(false);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Failed to login.');
        }
      }
    },
    [authService, onSuccess, setUser]
  );

  return {login, isLoading, error};
};
