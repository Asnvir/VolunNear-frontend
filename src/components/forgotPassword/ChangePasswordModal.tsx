import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useChangePassword} from '../../hooks/auth/useChangePassword/useChangePassword.ts';
import {ChangePasswordRequest} from '../../api/httpClient/types.ts';

// Define Zod schema for validation
const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long') // Minimum length validation
      .min(1, 'New password is required'), // Non-empty validation
    confirmPassword: z.string().min(1, 'Please confirm your new password'), // Non-empty validation
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // Field where the error should be displayed
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
};

export const ChangePasswordModal = ({
  isOpen,
  onClose,
  email,
}: ChangePasswordModalProps) => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const toast = useToast();

  const {changePassword, isLoading, error} = useChangePassword(
    () => {
      toast({
        title: 'Password Changed.',
        description: 'Your password has been changed successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    },
    errorMessage => {
      toast({
        title: 'Error',
        description: errorMessage || 'Failed to change password.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  );

  const onSubmit: SubmitHandler<ChangePasswordFormValues> = async data => {
    const changePasswordRequest: ChangePasswordRequest = {
      newPassword: data.newPassword,
      repeatedNewPassword: data.confirmPassword,
    };

    try {
      await changePassword({email, changePassword: changePasswordRequest});
    } catch (error) {
      console.error('Failed to change password:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Your Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.newPassword}>
              <FormLabel htmlFor="newPassword">New Password</FormLabel>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                {...register('newPassword')}
              />
              <FormErrorMessage>
                {errors.newPassword && errors.newPassword.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.confirmPassword} mt={4}>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                {...register('confirmPassword')}
              />
              <FormErrorMessage>
                {errors.confirmPassword && errors.confirmPassword.message}
              </FormErrorMessage>
            </FormControl>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isSubmitting || isLoading}
              >
                Change Password
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
