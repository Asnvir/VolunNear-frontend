import {Button, Spinner, Icon} from '@chakra-ui/react';
import {FaArrowDown} from 'react-icons/fa';

export const LoadMoreButton = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: {
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}) => {
  if (!hasNextPage) {
    return;
  }
  return (
    <Button
      onClick={() => fetchNextPage()}
      disabled={isFetchingNextPage}
      mt={4}
      size="lg"
      colorScheme="primary"
      rightIcon={
        isFetchingNextPage ? <Spinner size="sm" /> : <Icon as={FaArrowDown} />
      }
    >
      {isFetchingNextPage ? 'Loading more...' : 'Load More'}
    </Button>
  );
};
