import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

interface DescriptionProps {
  description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <Box mt={4}>
      <Heading as="h2" size="lg" mb={2}>Description</Heading>
      <Text mb={4}>
        {description}
      </Text>
    </Box>
  );
};

export default Description;
