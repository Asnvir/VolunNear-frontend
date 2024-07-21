import {Box, Flex, Text, Button, Heading, VStack, useMediaQuery} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const DescriptionBox = ({ heading, description, principles, buttonText, navigateTo, imgSrc, reverse }) => {
  const navigate = useNavigate();
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");

  return (
    <Flex
      direction={{ base: 'column', md: reverse && isLargerThanMD ? 'row-reverse' : 'row' }}
      align="center"
      justify="center"
      wrap="wrap"
      mt={8}
      mx="auto"
      maxW="1280px"
      p={4}
      gap={8}
    >
      <Box flex="1" display="flex" justifyContent="center" alignItems="center">
        <img
          src={imgSrc}
          alt={heading}
          style={{
            borderRadius: '24px',
            width: isLargerThanMD ? '680px' : '100%',
            height: 'auto'
          }}
        />
      </Box>
      <Box
        p={8}
        flex="1"
        textAlign={{ base: 'center', md: 'left' }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Heading as="h3" mb={4} textAlign="center" fontFamily="Bevan" fontSize="48px">
            {heading}
          </Heading>
          <Text mb={4} textAlign="center" fontFamily="Epilogue" fontSize="16px" color="#4F4F4F">
            {description}
          </Text>
          <VStack alignItems={{ base: 'center', md: 'flex-start' }} spacing={6} fontFamily="Poppins" fontSize="16px" color="#18171C">
            {principles.map((principle, index) => (
              <Box key={index}>
                <Heading as="h4" size="md" mb={2} fontWeight="700">
                  {principle.title}
                </Heading>
                <Text fontWeight="400">{principle.description}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
        <Flex justifyContent="left" mt={8}>
          <Button
            variant="primary"
            size="lg"
            px={10}
            py={6}
            fontSize="20px"
            onClick={() => navigate(navigateTo)}
          >
            {buttonText}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
