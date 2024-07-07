import {RouterProvider} from 'react-router-dom';
import {router} from './routes.tsx';
import {ChakraProvider} from '@chakra-ui/react';
import {ServiceProvider} from './providers/ServiceProvider.tsx';
import {AppStateProvider} from './providers/AppStateProvider.tsx';
import {AuthProvider} from './providers/AuthProvider.tsx';

export const App = () => {
  return (
    <ServiceProvider>
      <AppStateProvider>
        <AuthProvider>
          <ChakraProvider>
            <RouterProvider router={router} />
          </ChakraProvider>
        </AuthProvider>
      </AppStateProvider>
    </ServiceProvider>
  );
};
