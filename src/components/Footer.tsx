import {Box, Flex, Icon, Link, Stack, Text} from '@chakra-ui/react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
const Footer = () => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      width="100%"
      py="8"
      px={{ base: '4', md: '8' }}
      bg="orange.400"
      color="white"
    >
      <Flex justify="space-between" align="center" wrap="wrap" maxW="2000px" mx="auto">
        <Flex align="center">
          <Link href="/" title="Chakra UI Home Page" display="flex" alignItems="center">
            <Text ml="2" fontSize="lg" fontWeight="bold">
              Volun <Box as="span" color="gray.500">Near</Box>
            </Text>
          </Link>
        </Flex>
        <Text fontSize="sm" textAlign="center" flex="1" pl={{ base: 0, md: 8 }}>
          © 2024 VolunNear. All rights reserved.
        </Text>
        <Stack direction="row" spacing={4} align="center">
          <Link href="https://www.linkedin.com" isExternal>
            <Icon as={FaLinkedin} boxSize="5" />
          </Link>
          <Link href="https://github.com" isExternal>
            <Icon as={FaGithub} boxSize="5" />
          </Link>
          <Link href="https://twitter.com" isExternal>
            <Icon as={FaTwitter} boxSize="5" />
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;

