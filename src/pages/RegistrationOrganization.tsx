// RegistrationOrganization.jsx
import {useState} from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {useRegisterOrg} from '../hooks/useRegisterOrg.ts';

export const RegistrationOrganization = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    password: '',
    email: '',
    contactPerson: '',
  });
  const navigate = useNavigate();
  const toast = useToast();
  const {registerOrg, isLoading, error} = useRegisterOrg();

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await registerOrg(formData);
      toast({
        title: 'Registration successful.',
        description: "You've successfully registered as an organization.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Registration failed.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8}>
      <VStack as="form" spacing={4} onSubmit={handleSubmit}>
        <FormControl id="organizationName" isRequired>
          <FormLabel>Organization Name</FormLabel>
          <Input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="contactPerson">
          <FormLabel>Contact Person</FormLabel>
          <Input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">
          Register
        </Button>
      </VStack>
    </Box>
  );
};
