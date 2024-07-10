import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  FormValues,
  validationSchema,
} from '../../validation/RegistrationOrgValidation.ts';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {useRegisterOrg} from '../../hooks/useRegisterOrg.ts';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

export const RegistrationOrgForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const {registerOrg, error: errorOnServer} = useRegisterOrg({
    onSuccess: () => {
      navigate('/login');
    },
  });

  useEffect(() => {
    if (errorOnServer) {
      setError('root', {
        message: errorOnServer || 'Registration failed',
      });
    }
  }, [errorOnServer, setError]);

  const onSubmit: SubmitHandler<FormValues> = data => {
    registerOrg(data);
  };

  return (
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

      <FormControl isRequired={true} isInvalid={!!errors?.password}>
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
        <FormLabel htmlFor="nameOfOrganisation">Organization Name</FormLabel>
        <Input id="nameOfOrganisation" {...register('nameOfOrganisation')} />
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

      <Button disabled={isSubmitting} type="submit" colorScheme="blue">
        Register
      </Button>
      {errorOnServer && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Registration failed!</AlertTitle>
          <AlertDescription>{errorOnServer}</AlertDescription>
        </Alert>
      )}
    </VStack>
  );
};
