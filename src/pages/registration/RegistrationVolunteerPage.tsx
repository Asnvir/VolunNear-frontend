import {RegistrationVolForm} from '../../components/registration/RegistrationVolForm.tsx';
import {Box, Flex} from '@chakra-ui/react';

export const RegistrationVolunteerPage = () => {
  return (
    <Flex direction="column" flex="1" alignItems="center" justifyContent="center" width="full">
      <Box width="full" maxWidth="lg" p={4}>
        <RegistrationVolForm />
      </Box>
    </Flex>)
};
