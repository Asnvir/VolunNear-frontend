import {Flex, Spinner, Text} from '@chakra-ui/react';
import {FaStar} from 'react-icons/fa';

type RatingProps = {
  averageRating: number | undefined;
  isLoadingRating: boolean;
};

export const Rating = ({averageRating, isLoadingRating}: RatingProps) => {
  return (
    <Flex alignItems="center">
      {isLoadingRating ? (
        <Spinner size="sm" color="black" style={{marginRight: '8px'}} />
      ) : (
        <>
          <FaStar color="black" style={{marginRight: '8px'}} />
          <Text>{averageRating}</Text>
        </>
      )}
    </Flex>
  );
};
