import {Box, Heading, Image} from '@chakra-ui/react';

export type ActivityHeaderProps = {
  title: string;
  coverImage: string;
};

export const ActivityHeader = ({title, coverImage}: ActivityHeaderProps) => {
  return (
    <Box position="relative" textAlign="center" mb={4}>
      <Image
        src={coverImage}
        alt={title}
        width="100%"
        height="300px"
        objectFit="cover"
        borderRadius="md"
        opacity={0.8}
      />
      <Heading
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        color="white"
        fontSize="4xl"
        fontWeight="bold"
      >
        {title}
      </Heading>
    </Box>
  );
};
