import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import DOMPurify from 'dompurify'
interface DescriptionProps {
  description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  const sanitizedDescription = DOMPurify.sanitize(description);
  return (
    <Box mt={4}>
      <Heading as="h2" size="lg" mb={2}>Description</Heading>
      <Text mb={4} dangerouslySetInnerHTML={{ __html: sanitizedDescription }}/>
    </Box>
  );
};

export default Description;
