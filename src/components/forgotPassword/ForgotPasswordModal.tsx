import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {z, ZodSchema} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useVerifyEmail} from '../../hooks/auth/useVerifyEmail/useVerifyEmail.ts';

type ForgotPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onEmailSent: (email: string) => void;
  onError?: (errorMessage: string) => void; // Optional error handler
};

// Define the validation schema using zod
const schema: ZodSchema<{email: string}> = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
});

type FormValues = z.infer<typeof schema>;

export const ForgotPasswordModal = ({
  isOpen,
  onClose,
  onEmailSent,
  onError,
}: ForgotPasswordModalProps) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const {verifyEmail, isLoading, error} = useVerifyEmail(
    (email: string) => {
      onEmailSent(email); // Notify parent component that email has been sent
    },
    (errorMessage: string) => {
      if (onError) {
        onError(errorMessage);
      } else {
        toast({
          title: 'Error',
          description: errorMessage,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  );

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      await verifyEmail(data.email);
    } catch (e) {
      console.error('Error verifying email:', e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Forgot Password</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="Enter your email"
                mb={4}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <ModalFooter>
              <Button
                colorScheme="blue"
                type="submit"
                isLoading={isSubmitting || isLoading}
              >
                Send Reset Email
              </Button>
              <Button variant="outline" ml={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
