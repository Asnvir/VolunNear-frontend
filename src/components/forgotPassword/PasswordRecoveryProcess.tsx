import {ReactNode, useState} from 'react';
import {useDisclosure} from '@chakra-ui/react';
import {ForgotPasswordModal} from './ForgotPasswordModal';
import {VerifyOtpModal} from './VerifyOtpModal';
import {ChangePasswordModal} from './ChangePasswordModal';

type ActionRenderProps = {
  onForgotPasswordClick: () => void;
};

type PasswordRecoveryProcessProps = {
  onOtpVerified: () => void;
  renderAction: (props: ActionRenderProps) => ReactNode;
};

export const PasswordRecoveryProcess = ({
  onOtpVerified,
  renderAction,
}: PasswordRecoveryProcessProps) => {
  const [email, setEmail] = useState<string | null>(null);
  const [otpVerified, setOtpVerified] = useState(false);

  const {
    isOpen: isForgotPasswordOpen,
    onOpen: onForgotPasswordOpen,
    onClose: onForgotPasswordClose,
  } = useDisclosure();

  const {
    isOpen: isVerifyOtpOpen,
    onOpen: onVerifyOtpOpen,
    onClose: onVerifyOtpClose,
  } = useDisclosure();

  const {
    isOpen: isChangePasswordOpen,
    onOpen: onChangePasswordOpen,
    onClose: onChangePasswordClose,
  } = useDisclosure();

  const handleEmailSent = (email: string) => {
    setEmail(email);
    onForgotPasswordClose();
    onVerifyOtpOpen(); // Open OTP verification modal
  };

  const handleOtpVerified = () => {
    setOtpVerified(true);
    onOtpVerified();
    onVerifyOtpClose();
    onChangePasswordOpen(); // Open Change Password modal
  };

  return (
    <>
      {renderAction({onForgotPasswordClick: onForgotPasswordOpen})}

      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={onForgotPasswordClose}
        onEmailSent={handleEmailSent}
      />

      {email && (
        <VerifyOtpModal
          isOpen={isVerifyOtpOpen}
          onClose={onVerifyOtpClose}
          email={email}
          onOtpVerified={handleOtpVerified}
        />
      )}

      {email && otpVerified && (
        <ChangePasswordModal
          isOpen={isChangePasswordOpen}
          onClose={onChangePasswordClose}
          email={email}
        />
      )}
    </>
  );
};
