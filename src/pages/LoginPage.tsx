import {Box, Flex} from '@chakra-ui/react';
import LoginForm from '../components/login/LoginForm.tsx';

export const LoginPage = () => {
  return (
    <Flex direction="column" flex="1" alignItems="center" justifyContent="center" width="full">
      <Box width="full" maxWidth="md" p={4}>
        <LoginForm />
      </Box>
    </Flex>
  );
};
