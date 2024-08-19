import {
  Box,
  Text,
  Heading,
  Avatar,
  VStack,
  useMediaQuery,
  Flex,
} from '@chakra-ui/react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import FirstIcon from '../../../resources/testimonials/Image.svg';
import SecondIcon from '../../../resources/testimonials/Image-1.svg';
import ThirdIcon from '../../../resources/testimonials/Image-2.svg';
import FourthIcon from '../../../resources/testimonials/Image-3.svg';
import FifthIcon from '../../../resources/testimonials/Image-4.svg';
import SixIcon from '../../../resources/testimonials/Image-5.svg';
const testimonials = [
  {
    name: 'Maria',
    role: 'Community Member',
    text: 'VolunNear has given my community the resources we needed to build a better future. Through their educational programs, my children now have opportunities I could only dream of. The difference in our lives is beyond words.',
    image: FirstIcon, // Replace with actual path
  },
  {
    name: 'John',
    role: 'Volunteer',
    text: "Volunteering with VolunNear has been a life-changing experience. Seeing the direct impact of our work on people's lives is incredibly rewarding.",
    image: SecondIcon, // Replace with actual path
  },
  {
    name: 'Sarah',
    role: 'Corporate Partner',
    text: 'As a corporate partner, collaborating with VolunWear has been incredibly fulfilling. Their transparency, dedication, and impactful programs make it easy to support their mission. We are proud to contribute to a cause that truly transforms lives.',
    image: ThirdIcon, // Replace with actual path
  },
  {
    name: 'Raj',
    role: 'Entrepreneur',
    text: "VolunNear's micro-financing program has been a game-changer for our community. Small loans have allowed us to start businesses and improve our economic stability. We are now more self-reliant and optimistic about our future.",
    image: FourthIcon, // Replace with actual path
  },
  {
    name: 'David',
    role: 'Beneficiary',
    text: "VolunNear's healthcare initiatives have transformed our community's well-being. Access to regular medical check-ups and health education has drastically improved our quality of life. We are healthier and more informed, thanks to their tireless efforts.",
    image: FifthIcon, // Replace with actual path
  },
  {
    name: 'Amina',
    role: 'Program Participant',
    text: "Participating in VolunNear's vocational training program has given me the skills and confidence to start my own business. I am now able to provide for my family and contribute to my community. VolunWear has truly changed my life.",
    image: SixIcon, // Replace with actual path
  },
];

type TestimonialsProps = {id?: string};

const Testimonials = ({id}: TestimonialsProps) => {
  const [isLargerThanMD] = useMediaQuery('(min-width: 48em)');

  return (
    <Box
      id={id}
      mx="auto"
      py={16}
      px={{base: 4, md: 8}}
      maxW="1440px"
      textAlign="center"
    >
      <Heading
        fontFamily="Bevan"
        fontWeight="700"
        fontSize={{base: '32px', md: '48px'}}
        color="#18171C"
        mb={12}
      >
        Voices of Hope
      </Heading>
      <Carousel
        showArrows={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
      >
        {testimonials.map((testimonial, index) => (
          <Box key={index} p={{base: 4, md: 8}} mx="auto" maxW="800px">
            <Flex
              direction={{base: 'column', md: 'row'}}
              alignItems="center"
              justifyContent="center"
              textAlign={{base: 'center', md: 'left'}}
              gap={8}
            >
              <Avatar src={testimonial.image} size="xl" mb={{base: 4, md: 0}} />
              <VStack align="left" spacing={4}>
                <Text
                  fontFamily="Epilogue"
                  fontWeight="400"
                  fontSize="16px"
                  color="#4F4F4F"
                >
                  {testimonial.text}
                </Text>
                <Text
                  fontFamily="Epilogue"
                  fontWeight="700"
                  fontSize="16px"
                  color="#18171C"
                >
                  {testimonial.name}, {testimonial.role}
                </Text>
              </VStack>
            </Flex>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Testimonials;
