import {Box, Heading, HStack, IconButton, Image, Text, useToast} from '@chakra-ui/react';
import NoImage from '../../../../resources/No_image_available.png';
import {Organization} from '../../../api/services/organizations/types.ts';
import { BellIcon } from '@chakra-ui/icons';
import {useState} from 'react';

type OrganisationCardProps = {
  organisation: Organization;
  onClick: (organizationID: string) => void;
  onSubscribe: (organizationID: string) => void;
  isSubscribed: boolean;
};

export const OrganisationCard = ({
                                   organisation,
                                   onClick,
                                   onSubscribe,
                                   onUnSubscribe,
                                   isSubscribed: initialIsSubscribed,
                                 }: OrganisationCardProps) => {
  const toast = useToast();
  const [isSubscribed, setIsSubscribed] = useState(initialIsSubscribed);
  const handleSubscribe = async (e: React.MouseEvent) => {


    e.stopPropagation();
    try {
      if (isSubscribed) {
        await onUnSubscribe(organisation.id.toString());
        setIsSubscribed(false);
        toast({
          title: 'Unsubscribed',
          description: `You have unsubscribed from notifications for ${organisation.nameOfOrganisation}.`,
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await onSubscribe(organisation.id.toString());
        setIsSubscribed(true);
        toast({
          title: 'Subscribed',
          description: `You have subscribed to notifications for ${organisation.nameOfOrganisation}.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to update subscription for ${organisation.nameOfOrganisation}.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
      position="relative"
    >
      <IconButton
        icon={<BellIcon />}
        aria-label="Subscribe to notifications"
        position="absolute"
        top={2}
        right={2}
        size="sm"
        color={isSubscribed ? 'orange.400' : 'gray.400'}
        onClick={handleSubscribe}
      />
      <Box>
        <Box width="100%" height="200px" overflow="hidden" mb={6}>
          <Image
            src={organisation.avatarUrl || NoImage}
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