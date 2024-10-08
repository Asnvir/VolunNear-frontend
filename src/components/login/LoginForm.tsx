import {SubmitHandler, useForm} from 'react-hook-form';
import {LoginValidationSchema} from '../../api/validation/login/LoginValidation.ts';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useLogin} from '../../hooks/auth/useLogin/useLogin.ts';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {LoginFormValues} from '../../api/validation/login/types.ts';
import {SignUpContainer} from '../registration/SignUpContainer.tsx';
import {PasswordRecoveryProcess} from '../forgotPassword/PasswordRecoveryProcess.tsx';

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
  const [isPasswordRecoveryOpen, setIsPasswordRecoveryOpen] = useState(false);

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
        message: errorOnServer || 'Login failed',
      });
    }
  }, [errorOnServer, setError]);

  return (
    <Box
      maxW="md"
      w="full"
      p={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <VStack spacing={6} align="center" width="full">
        <Heading as="h1" size="lg" textAlign="center" width="full" mb={4}>
          Login
        </Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center" width="full">
          Please enter your username and password to login.
        </Text>

        <FormControl isRequired isInvalid={!!errors?.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            placeholder="Enter your username"
            size="lg"
            {...register('username')}
          />
          <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors?.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup size="lg">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password')}
            />
            <InputRightElement>
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={handlePasswordVisibility}
                variant="ghost"
                size="lg"
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        </FormControl>

        <Button
          disabled={isSubmitting}
          variant={'primary'}
          width="full"
          size="lg"
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </Button>

        <Flex justify="space-between" width="full" mt={4}>
          <SignUpContainer />
          <PasswordRecoveryProcess
            onOtpVerified={() => {}}
            renderAction={({onForgotPasswordClick}) => (
              <Button variant="secondary" onClick={onForgotPasswordClick}>
                Forgot password?
              </Button>
            )}
          />
        </Flex>

        {errorOnServer && (
          <Alert status="error" mt={4} width="full">
            <AlertIcon />
            <AlertTitle mr={2}>Login failed!</AlertTitle>
            <AlertDescription>{errorOnServer}</AlertDescription>
          </Alert>
        )}
      </VStack>
    </Box>
  );
};

export default LoginForm;
