import {SubmitHandler, useForm} from 'react-hook-form';
import {
  LoginFormValues,
  LoginValidationSchema,
} from '../../api/validation/login/LoginValidation.ts';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useLogin} from '../../hooks/auth/useLogin/useLogin.ts';
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

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginValidationSchema),
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const onLoginSuccess = () => {
    navigate('/');
  };

  const {login, error: errorOnServer} = useLogin({onSuccess: onLoginSuccess});

  const onSubmit: SubmitHandler<LoginFormValues> = data => {
    login(data);
  };

  useEffect(() => {
    if (errorOnServer) {
      setError('root', {
        message: errorOnServer || 'Registration failed',
      });
    }
  }, [errorOnServer, setError]);

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

      <Button disabled={isSubmitting} type="submit" colorScheme="blue">
        Login
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
