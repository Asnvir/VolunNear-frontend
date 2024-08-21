import {Box, Avatar, Text} from '@chakra-ui/react';

export type OrganizationInfoProps = {
  name: string;
  address: string;
  city: string;
  country: string;
  avatarUrl?: string;
};

export const OrganizationInfo = ({
  name,
  address,
  city,
  country,
  avatarUrl,
}: OrganizationInfoProps) => {
  return (
    <Box display="flex" alignItems="center" mb={4}>
      <Avatar
        src={avatarUrl || 'https://via.placeholder.com/150'}
        size="md"
        mr={4}
      />
      <Box>
        <Text fontWeight="bold">{name}</Text>
        <Text>{`${address}, ${city}, ${country}`}</Text>
      </Box>
    </Box>
  );
};
