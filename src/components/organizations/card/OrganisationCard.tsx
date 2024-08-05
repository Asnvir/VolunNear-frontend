import {Box, Heading, HStack, Image, Text} from '@chakra-ui/react';
// import NoImage from '../../../resources/No_image_available.png';
import {Organization} from '../../../api/services/organizations/types.ts';

type OrganisationCardProps = {
  organisation: Organization;
  onClick: (organizationID: string) => void;
};

export const OrganisationCard = ({
  organisation,
  onClick,
}: OrganisationCardProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      _hover={{
        boxShadow: 'lg',
        transform: 'translateY(-16px)',
        transition: 'all 0.2s',
      }}
      width="100%"
      maxW="100%"
      cursor="pointer"
      bg="white"
      onClick={() => onClick(organisation.id.toString())}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Box width="100%" height="200px" overflow="hidden" mb={6}>
          <Image
            src={organisation.avatarUrl || NoImage || ''}
            alt={organisation.nameOfOrganisation}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </Box>
        <Box px={6} pb={6}>
          <Heading as="h3" size="md" mb="2" isTruncated>
            {organisation.nameOfOrganisation}
          </Heading>
          <HStack mb="4">
            <Text fontWeight="bold">{organisation.city}</Text>
            <Text>, {organisation.country}</Text>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};
