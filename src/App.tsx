import {ChakraProvider} from '@chakra-ui/react';
import {ServiceProvider} from './providers/ServiceProvider.tsx';
import {AppStateProvider} from './providers/AppStateProvider.tsx';
import {AuthProvider} from './providers/AuthProvider.tsx';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './providers/queryClientProvider/util.ts';
import {ActivitiesFiltersProvider} from './providers/ActivitiesFiltersProvider.tsx';
import {theme} from './theme/theme.tsx';
import {CustomRouterProvider} from './providers/CustomRouterProvider.tsx';

export const App = () => {
  return (
    <ServiceProvider>
      <AppStateProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ActivitiesFiltersProvider>
              <ChakraProvider theme={theme}>
                {/*<RouterProvider router={router} />*/}
                <CustomRouterProvider />
              </ChakraProvider>
            </ActivitiesFiltersProvider>
          </QueryClientProvider>
        </AuthProvider>
      </AppStateProvider>
    </ServiceProvider>
  );
};
