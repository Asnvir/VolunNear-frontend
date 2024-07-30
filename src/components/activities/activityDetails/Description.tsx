import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

interface DescriptionProps {
  description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <Box bg="white" p={4} rounded="md" shadow="md">
      <Heading as="h3" size="md">Description</Heading>
      <Text mt={2}>{description}</Text>
    </Box>
  );
};

export default Description;
