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
import {useVerifyOTP} from '../../hooks/auth/useVerifyOTP/useVerifyOTP.tsx';

type VerifyOtpFormValues = {
  otp: string;
};

type VerifyOtpModalProps = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onOtpVerified: () => void; // Callback to handle OTP verification state
};

export const VerifyOtpModal = ({
  isOpen,
  onClose,
  email,
  onOtpVerified,
}: VerifyOtpModalProps) => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<VerifyOtpFormValues>();

  const {verifyOTP, isLoading, error} = useVerifyOTP(
    (otp, email) => {
      // Handle success: Notify parent component and close modal
      toast({
        title: 'OTP Verified.',
        description: 'You can now set a new password.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onOtpVerified(); // Notify parent component that OTP has been verified
      onClose();
    },
    errorMessage => {
      // Handle error: Show error message in toast
      toast({
        title: 'Error',
        description: errorMessage || 'Failed to verify OTP.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  );

  const onSubmit: SubmitHandler<VerifyOtpFormValues> = async data => {
    try {
      console.log(
        `VerifyOtpModal - Before calling verifyOTP: ${data.otp}, ${email}`
      );

      console.log(`type of verifyOTP: ${typeof verifyOTP}`);
      await verifyOTP({otp: data.otp, email});
    } catch (error) {
      console.error(`Failed to verify OTP: ${error}`);
    }
  };

  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Verify OTP</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.otp}>
              <FormLabel htmlFor="otp">Enter OTP</FormLabel>
              <Input
                id="otp"
                type="text"
                placeholder="Enter the OTP"
                {...register('otp', {
                  required: 'OTP is required',
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: 'Invalid OTP',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.otp && errors.otp.message}
              </FormErrorMessage>
            </FormControl>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isSubmitting || isLoading} // Show loading state when either form or OTP verification is in progress
              >
                Verify OTP
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
