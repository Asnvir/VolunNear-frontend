import { Box, Flex, Text, Button, Heading, UnorderedList, ListItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const DescriptionBox = ({ heading, description, principles, buttonText, navigateTo }) => {
  const navigate = useNavigate();
  return (
    <Box
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      p={8}
      flex="1"
      textAlign="left"
      boxShadow="md"
      minW={{ base: '100%', md: '45%' }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Heading as="h3" size="lg" mb={4} textAlign="center">
          {heading}
        </Heading>
        <Text mb={4}>
          {description}
        </Text>
        <UnorderedList mb={6} pl={4} spacing={3}>
          {principles.map((principle, index) => (
            <ListItem key={index}>{principle}</ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Flex justifyContent="center" mt={4}>
        <Button variant="primary" size="lg" onClick={() => navigate(navigateTo)}>
          {buttonText}
        </Button>
      </Flex>
    </Box>
  );
};
