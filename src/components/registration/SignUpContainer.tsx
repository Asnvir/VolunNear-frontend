import {SignUpModal} from './SignUpModal';
import {useDisclosure} from '@chakra-ui/react';
import {SignUpButton} from './SignUpButton.tsx';

export const SignUpContainer = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      <SignUpButton onOpen={onOpen} />
      <SignUpModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
