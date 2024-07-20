import {LoginForm} from '../components/login/LoginForm.tsx';
import {Box, Flex} from '@chakra-ui/react';

export const LoginPage = () => {
  return (
    <Flex flex="1" justifyContent="center" alignItems="center" minHeight="calc(100vh - var(--chakra-space-12))" padding="4">
      <Box width="full" maxWidth="md">
        <LoginForm />
      </Box>
    </Flex>
  );
};
