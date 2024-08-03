import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Text,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack, useToast,
} from '@chakra-ui/react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {useRegisterOrg} from '../../hooks/auth/useRegisterOrg/useRegisterOrg.ts';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {RegistrationOrgFormValues} from '../../api/validation/register/organization/types.ts';
import {RegistrationOrgValidationSchema} from '../../api/validation/register/organization/RegistrationOrgValidation.ts';

export const RegistrationOrgForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<RegistrationOrgFormValues>({
    resolver: zodResolver(RegistrationOrgValidationSchema),
  });
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const {registerOrg, error: errorOnServer} = useRegisterOrg({
    onSuccess: () => {
      navigate('/login');
      toast({
        title: 'Registration successful',
        description: 'You can now login to your account',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
  });

  useEffect(() => {
    if (errorOnServer) {
      setError('root', {
        message: errorOnServer || 'Registration failed',
      });
    }
  }, [errorOnServer, setError]);

  const onSubmit: SubmitHandler<RegistrationOrgFormValues> = data => {
    registerOrg(data);
  };

  return (
    <Box
      maxW="lg"
      w="full"
      minW={{base: '90%', md: '80%'}}
      p={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <VStack spacing={6} align="center" width="full">
        <Heading as="h1" size="lg" textAlign="center" width="full" mb={4}>
          Register Organization
        </Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center" width="full">
          Please fill in the details to register your organization.
        </Text>

        <VStack
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          spacing={4}
          align="flex-start"
          width="full"
        >
          <FormControl isRequired isInvalid={!!errors?.username}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input id="username" {...register('username')} />
            <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors?.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={handlePasswordVisibility}
                  variant="ghost"
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors?.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" {...register('email')} />
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors?.nameOfOrganisation}>
            <FormLabel htmlFor="nameOfOrganisation">
              Organization Name
            </FormLabel>
            <Input
              id="nameOfOrganisation"
              {...register('nameOfOrganisation')}
            />
            <FormErrorMessage>
              {errors?.nameOfOrganisation?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors?.country}>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Input id="country" {...register('country')} />
            <FormErrorMessage>{errors?.country?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors?.city}>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input id="city" {...register('city')} />
            <FormErrorMessage>{errors?.city?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors?.address}>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input id="address" {...register('address')} />
            <FormErrorMessage>{errors?.address?.message}</FormErrorMessage>
          </FormControl>

          <Button
            disabled={isSubmitting}
            variant="primary"
            width="full"
            size="lg"
            type="submit"
          >
            Register
          </Button>
        </VStack>

        {errorOnServer && (
          <Alert status="error" mt={4} width="full">
            <AlertIcon />
            <AlertTitle mr={2}>Registration failed!</AlertTitle>
            <AlertDescription>{errorOnServer}</AlertDescription>
          </Alert>
        )}
      </VStack>
    </Box>
  );
};

export default RegistrationOrgForm;
