import {Button} from '@chakra-ui/react';

type SignUpButtonProps = {onOpen: () => void};

export const SignUpButton = ({onOpen}: SignUpButtonProps) => {
  return (
    <Button variant="secondary" onClick={onOpen}>
      Sign up
    </Button>
  );
};
