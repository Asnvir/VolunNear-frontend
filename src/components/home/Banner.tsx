import {Box, Flex, Image, Text, Heading, Button} from '@chakra-ui/react';
import BannerImage from "../../../resources/banner.jpg"
const Banner = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      align="center"
      justify="space-between"
      bg="white"
      p={8}
      mx="auto"
      maxW="1200px"
      mt={8}
      borderRadius="lg"
      boxShadow="lg"
      overflow="hidden"
    >
      <Box flex="1" mr={{ base: 0, md: 8 }} mb={{ base: 8, md: 0 }}>
        <Image
          src={BannerImage}
          alt="VolunNear"
          borderRadius="lg"
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Box>
      <Box flex="1" textAlign={{ base: 'center', md: 'left' }}>
        <Heading as="h2" size="xl" mb={4} fontFamily="heading">
          Welcome to VolunNear
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={4} fontFamily="body">
          VolunNear is an organization dedicated to connecting volunteers with
          local opportunities to make a positive impact in their communities. We
          believe in the power of collective effort and the difference that one
          person can make. Join us in our mission to create a better world, one
          act of kindness at a time.
        </Text>
        <Button variant="primary">Learn More</Button>
      </Box>
    </Flex>
  );
};

export default Banner;
