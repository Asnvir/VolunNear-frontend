import {Avatar, HStack, Text, VStack} from '@chakra-ui/react';
import React from 'react';

type OrganizationInfoProps = {
  avatarUrl?: string;
  name: string;
  address: string;
  city: string;
  country: string;
};

export const OrganizationInfo: React.FC<OrganizationInfoProps> = ({
  avatarUrl,
  name,
  address,
  city,
  country,
}) => {
  return (
    <HStack spacing={4} alignItems="center">
      <Avatar src={avatarUrl} size="md" />
      <VStack alignItems="flex-start" spacing={0}>
        <Text fontWeight="bold">Organisation: {name}</Text>
        <Text>{`${address}, ${city}, ${country}`}</Text>
      </VStack>
    </HStack>
  );
};
