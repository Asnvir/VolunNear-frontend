import { Box, Flex, Text, Heading, Image, VStack, useMediaQuery } from '@chakra-ui/react';
import OurJourneyImg  from '../../../resources/Our Journey.svg';
const JourneyOfVolunNearSection = () => {
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");

  return (
    <Box mx="auto" p={4} maxW="1440px" textAlign="center" color="black">
      <Box py={8}>
        <Heading fontFamily="Bevan" fontWeight="700" fontSize={{ base: "48px", md: "96px" }} color="#FF7A00">
          Friends. Family. Communities.
        </Heading>
      </Box>
      <Flex direction={isLargerThanMD ? 'row' : 'column'} justifyContent="center" alignItems="top" my={8} gap={16}>
        <VStack alignItems="flex-start" spacing={4} width={isLargerThanMD ? '50%' : '100%'} pt={36}>
          <Heading fontFamily="Bevan" fontWeight="700" fontSize={{ base: "24px", md: "36px" }} color="#18171C">
            The Journey of VolunNear
          </Heading>
          <Text fontFamily="Epilogue" fontWeight="400" fontSize="16px" color="#4F4F4F" textAlign={isLargerThanMD ? 'left' : 'center'}  maxW={560}>
            VolunWear was born out of a belief that everyone can make a difference. Founded in [Year], our organization began with a small group of dedicated volunteers. From these humble beginnings, we have grown into a vibrant community of volunteers, partners, and supporters, all united by a common goal: to provide support and resources to those in need.
            <br /><br />
            Our journey is marked by countless stories of hope and transformation. From individuals who have received essential support through our programs to communities that have thrived through collective efforts, these successes fuel our commitment to continue our work with unwavering dedication. We invite you to be a part of our story.
            <br /><br />
            Together, we can create a world where kindness and support are accessible to all.
          </Text>
        </VStack>
        <Image
          src={OurJourneyImg} // Replace with your image path
          alt="The Journey of VolunWear"
          borderRadius="24px"
          boxShadow="md"
          width={isLargerThanMD ? '50%' : '100%'}
          height="auto"
        />
      </Flex>
    </Box>
  );
};

export default JourneyOfVolunNearSection;