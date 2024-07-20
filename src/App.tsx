import {RouterProvider} from 'react-router-dom';
import {router} from './routes.tsx';
import {ChakraProvider} from '@chakra-ui/react';
import {ServiceProvider} from './providers/ServiceProvider.tsx';
import {AppStateProvider} from './providers/AppStateProvider.tsx';
import {AuthProvider} from './providers/AuthProvider.tsx';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './providers/queryClientProvider/util.ts';
import {ActivitiesProvider} from './providers/ActivitiesProvider.tsx';

export const App = () => {
  return (
    <ServiceProvider>
      <AppStateProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ActivitiesProvider>
              <ChakraProvider>
                <RouterProvider router={router} />
              </ChakraProvider>
            </ActivitiesProvider>
          </QueryClientProvider>
        </AuthProvider>
      </AppStateProvider>
    </ServiceProvider>
  );
};
