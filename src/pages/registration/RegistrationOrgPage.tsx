import {RegistrationOrgForm} from '../../components/registration/RegistrationOrgForm.tsx';
import {Box, Flex} from '@chakra-ui/react';


export const RegistrationOrgPage = () => {
  return (
  <Flex direction="column" flex="1" alignItems="center" justifyContent="center" width="full">
    <Box width="full" maxWidth="lg" p={4}>
      <RegistrationOrgForm />
    </Box>
  </Flex>)
};
