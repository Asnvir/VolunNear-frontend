import {Flex, Button, Spinner} from '@chakra-ui/react';

type JoinButtonProps = {
  isLoading: boolean;
  onJoin: () => void;
};

export const JoinButton = ({isLoading, onJoin}: JoinButtonProps) => {
  return (
    <Flex justify="center" mb={6}>
      {isLoading ? (
        <Spinner color="primary.500" />
      ) : (
        <Button colorScheme="primary" onClick={onJoin}>
          Join event
        </Button>
      )}
    </Flex>
  );
};
