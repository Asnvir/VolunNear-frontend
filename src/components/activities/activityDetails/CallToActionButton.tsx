import {Button} from '@chakra-ui/react';

export type CallToActionButtonProps = {
  onClick: () => void;
};

export const CallToActionButton = ({onClick}: CallToActionButtonProps) => {
  return (
    <Button colorScheme="orange" size="lg" onClick={onClick} mb={4}>
      Join Activity
    </Button>
  );
};
