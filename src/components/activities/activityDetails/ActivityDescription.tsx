import {Box} from '@chakra-ui/react';

export type ActivityDescriptionProps = {
  description: string;
};

export const ActivityDescription = ({
  description,
}: ActivityDescriptionProps) => {
  return (
    <Box mb={4} p={4} bg="gray.50" borderRadius="md">
      <Box dangerouslySetInnerHTML={{__html: description}} />
    </Box>
  );
};
