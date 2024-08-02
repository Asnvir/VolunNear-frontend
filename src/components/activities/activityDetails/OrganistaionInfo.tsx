import { Box, Avatar, Text, HStack, VStack } from '@chakra-ui/react';

interface OrganizationInfoProps {
  avatar: string;
  name: string;
  location: string;
}

const OrganizationInfo: React.FC<OrganizationInfoProps> = ({ avatar, name, location }) => {
  return (
    <HStack spacing={4} alignItems="center">
  <Avatar src={avatar} size="md" />
  <VStack alignItems="flex-start" spacing={0}>
  <Text fontWeight="bold">Organisation: {name}</Text>
  <Text>{location}</Text>
  </VStack>
  </HStack>
);
};

export default OrganizationInfo;