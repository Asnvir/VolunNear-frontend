
import {DescriptionBox} from './DescriptionBox.tsx';
import {Box, Heading, Text} from '@chakra-ui/react';
import DescriptionImage from '../../../resources/become volunteer.svg'

const DescriptionBoxes = () => {
  const volunteerPrinciples = [
    { title: "Commitment", description: "Commit to the cause and show dedication." },
    { title: "Respect", description: "Respect the communities you serve." },
    { title: "Communication", description: "Communicate effectively with team members." },
    { title: "Punctuality", description: "Be punctual and reliable." },
    { title: "Attitude", description: "Maintain a positive attitude." }
  ];

  const organizationPrinciples = [
    { title: "Transparency", description: "Collaborate transparently with volunteers." },
    { title: "Clarity", description: "Provide clear and detailed instructions." },
    { title: "Safety", description: "Ensure a safe and respectful environment." },
    { title: "Appreciation", description: "Recognize and appreciate volunteer efforts." },
    { title: "Alignment", description: "Align volunteer roles with their skills and interests." }
  ];

  return (
    <Box mx="auto" p={4} maxW="1440px" bg="white" textAlign="center">
      <Box py={8}>
        <Text fontFamily="Epilogue" fontWeight="700" fontSize="18px" color="#FF7A00">
          Principles
        </Text>
        <Heading fontFamily="Bevan" fontWeight="400" fontSize="48px" color="#18171C" mt={4}>
          Our Guiding Principles
        </Heading>
        <Text fontFamily="Epilogue" fontWeight="400" fontSize="16px" color="#4F4F4F" mt={4}>
          At Hope, we are dedicated to uplifting communities through a range of targeted initiatives. Our focus areas include
        </Text>
      </Box>
      <DescriptionBox
        heading="Principles for Volunteers"
        description="Here are some guiding principles for our volunteers:"
        principles={volunteerPrinciples}
        buttonText="Become a Volunteer"
        navigateTo="registration/volunteer"
        imgSrc={DescriptionImage}
        reverse={false}
      />
      <DescriptionBox
        heading="Principles for Organizations"
        description="Here are some guiding principles for our partner organizations:"
        principles={organizationPrinciples}
        buttonText="Become an Organization"
        navigateTo="registration/organization"
        imgSrc={DescriptionImage}
        reverse={true}
      />
    </Box>
  );
};

export default DescriptionBoxes;
