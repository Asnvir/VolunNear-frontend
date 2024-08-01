import {Flex, Image} from '@chakra-ui/react';
import BannerImage from '../../../resources/banner.jpg';

const Banner = () => {
  return (
    <Flex
      direction={{base: 'column', md: 'row'}}
      align="center"
      justify="space-between"
      bg="white"
      p={8}
      mx="auto"
      maxW="1280px"
      mt={8}
      mb={8}
      borderRadius="lg"
      overflow="hidden"
    >
      <Image
        src={BannerImage}
        alt="VolunNear"
        borderRadius="lg"
        objectFit="cover"
        width="100%"
        height="100%"
      />
    </Flex>
  );
};

export default Banner;
