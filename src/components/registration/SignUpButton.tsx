import {Link} from '@chakra-ui/react';

type SignUpButtonProps = {onOpen: () => void};

export const SignUpButton = ({onOpen}: SignUpButtonProps) => {
  return (
    <Link color="blue.500" onClick={onOpen}>
      Sign up
    </Link>
  );
};
