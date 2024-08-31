import {Button, Flex, Spinner} from '@chakra-ui/react';

type LeaveButtonProps = {
  isLoading: boolean;
  onLeave: () => void;
};

export const LeaveButton = ({isLoading, onLeave}: LeaveButtonProps) => {
  return (
    <Flex justify="center" mb={6}>
      {isLoading ? (
        <Spinner color="primary.500" />
      ) : (
        <Button colorScheme="red" onClick={onLeave}>
          Leave event
        </Button>
      )}
    </Flex>
  );
};
