import {Flex, Spinner, Text} from '@chakra-ui/react';

type FeedbackCountProps = {
  numOfFeedbacks: number;
  isLoadingFeedbacks: boolean;
};

export const FeedbackCount = ({
  numOfFeedbacks,
  isLoadingFeedbacks,
}: FeedbackCountProps) => {
  return (
    <Flex alignItems="center">
      {isLoadingFeedbacks ? (
        <Spinner size="sm" color="black" style={{marginRight: '8px'}} />
      ) : (
        <Text>{`Feedbacks: ${numOfFeedbacks}`}</Text>
      )}
    </Flex>
  );
};
