import {SubmitHandler, useForm} from 'react-hook-form';
import {
  RegistrationVolFormValues,
  RegistrationVolValidationSchema,
} from '../../api/validation/register/volunteer/RegistrationVolValidation.ts';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useRegisterVol} from '../../hooks/auth/useRegisterVol/useRegisterVol.ts';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  Text,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';

export const RegistrationVolForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<RegistrationVolFormValues>({
    resolver: zodResolver(RegistrationVolValidationSchema),
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const {registerVol, error: errorOnServer} = useRegisterVol({
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

  const onSubmit: SubmitHandler<RegistrationVolFormValues> = data => {
    registerVol(data);
  };

  return (
    <Box
      maxW="lg" // Adjust the max width to make the places wider
      w="full"
      p={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <VStack spacing={6} align="center" width="full">
        <Heading as="h1" size="lg" textAlign="center" width="full" mb={4}>
          Register Volunteer
        </Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center" width="full">
          Please fill in the details to register as a volunteer.
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

          <FormControl isRequired isInvalid={!!errors?.realName}>
            <FormLabel htmlFor="realName">Real Name</FormLabel>
            <Input id="realName" {...register('realName')} />
            <FormErrorMessage>{errors?.realName?.message}</FormErrorMessage>
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

export default RegistrationVolForm;
