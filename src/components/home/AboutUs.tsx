import {Box, Flex, Text, Heading, Image, VStack} from '@chakra-ui/react';
// import AboutUsImage from '../../../resources/About us.svg';

const AboutUsSection = () => {
  return (
    <Box mx="auto" p={4} maxW="1440px" textAlign="center" color="black">
      <Box py={8}>
        <Text
          fontFamily="Epilogue"
          fontWeight="700"
          fontSize="18px"
          color="#FF7A00"
        >
          About us
        </Text>
        <Heading
          fontFamily="Bevan"
          fontWeight="700"
          fontSize={{base: '32px', md: '40px'}}
          color="black"
          mt={4}
        >
          A Future Filled with VolunNear
        </Heading>
        <Text
          fontFamily="Epilogue"
          fontWeight="400"
          fontSize="16px"
          color="#4F4F4F"
          mt={4}
        >
          At VolunNear, we are dedicated to uplifting communities through a
          range of targeted initiatives.
        </Text>
      </Box>
      <Flex justifyContent="center" my={8}>
        <Image
          // src={AboutUsImage}
          alt="A Future Filled with Hope"
          borderRadius="24px"
          boxShadow="md"
          width={{base: '100%', md: '1280px'}}
          height="auto"
        />
      </Flex>
      <Flex
        direction={{base: 'column', md: 'row'}}
        justifyContent="space-between"
        px={8}
        gap={8}
      >
        <VStack
          alignItems="flex-start"
          spacing={4}
          width={{base: '100%', md: '400px'}}
        >
          <Heading
            fontFamily="Bevan"
            fontWeight="700"
            fontSize={{base: '20px', md: '24px'}}
            color="#18171C"
          >
            Our Mission
          </Heading>
          <Text
            fontFamily="Epilogue"
            fontWeight="400"
            fontSize="16px"
            color="#4F4F4F"
            textAlign="start"
          >
            Our mission is to empower individuals and communities by providing
            the tools and support they need to overcome challenges and achieve
            their fullest potential through collaborative efforts.
          </Text>
        </VStack>
        <VStack
          alignItems="flex-start"
          spacing={4}
          width={{base: '100%', md: '400px'}}
        >
          <Heading
            fontFamily="Bevan"
            fontWeight="700"
            fontSize={{base: '20px', md: '24px'}}
            color="#18171C"
          >
            Our Vision
          </Heading>
          <Text
            fontFamily="Epilogue"
            fontWeight="400"
            fontSize="16px"
            color="#4F4F4F"
            textAlign="start"
          >
            Our vision is a world where every individual, regardless of their
            background or circumstances, has the opportunity to thrive. We
            envision communities that are resilient, self-reliant, and full of
            promise.
          </Text>
        </VStack>
        <VStack
          alignItems="flex-start"
          spacing={4}
          width={{base: '100%', md: '400px'}}
        >
          <Heading
            fontFamily="Bevan"
            fontWeight="700"
            fontSize={{base: '20px', md: '24px'}}
            color="#18171C"
          >
            Global Movement
          </Heading>
          <Text
            fontFamily="Epilogue"
            fontWeight="400"
            fontSize="16px"
            color="#4F4F4F"
            textAlign="start"
          >
            We envision a global movement where compassion and empathy drive
            action, where the barriers of inequality and injustice are
            dismantled, and where hope is not just a fleeting sentiment but a
            tangible reality.
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default AboutUsSection;
