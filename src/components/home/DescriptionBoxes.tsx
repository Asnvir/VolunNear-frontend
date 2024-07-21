import {Flex} from '@chakra-ui/react';
import {DescriptionBox} from './DescriptionBox.tsx';

const DescriptionBoxes = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      align="stretch"
      justify="center"
      wrap="wrap"
      mt={8}
      mx="auto"
      maxW="1200px"
      p={4}
      gap={8}
    >
      <DescriptionBox
        heading="Principles for Volunteers"
        description="Here are some guiding principles for our volunteers:"
        principles={[
          "Commit to the cause and show dedication.",
          "Respect the communities you serve.",
          "Communicate effectively with team members.",
          "Be punctual and reliable.",
          "Maintain a positive attitude."
        ]}
        buttonText="Become a Volunteer"
        navigateTo="registration/volunteer"
      />
      <DescriptionBox
        heading="Principles for Organizations"
        description="Here are some guiding principles for our partner organizations:"
        principles={[
          "Collaborate transparently with volunteers.",
          "Provide clear and detailed instructions.",
          "Ensure a safe and respectful environment.",
          "Recognize and appreciate volunteer efforts.",
          "Align volunteer roles with their skills and interests."
        ]}
        buttonText="Become an Organization"
        navigateTo="registration/organization"
      />
    </Flex>
  );
};

export default DescriptionBoxes;
