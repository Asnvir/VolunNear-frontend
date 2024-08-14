import {
  Box, Button,
  Heading,
  HStack,
  IconButton,
  Image, Modal, ModalBody, ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text, useDisclosure,
  useToast,
} from '@chakra-ui/react';
import NoImage from '../../../../resources/No_image_available.png';
import {Organization} from '../../../api/services/organizations/types.ts';
import { BellIcon } from '@chakra-ui/icons';
import {useState} from 'react';

type OrganisationCardProps = {
  organisation: Organization;
  onClick: (organizationID: Organization) => void;
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalConfirm, setIsModalConfirm] = useState(false);

  const handleSubscribe = async () => {
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
    onClose();
  };

  const handleSubscribeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalConfirm(true);
    onOpen();
  };

  return (
    <>
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
        onClick={() => onClick(organisation)}
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
          onClick={handleSubscribeClick}
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

      {/* Subscription Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isSubscribed ? 'Unsubscribe from Notifications' : 'Subscribe to Notifications'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {isSubscribed
                ? `You are about to unsubscribe from ${organisation.nameOfOrganisation}. You will no longer receive email notifications for new activities. Do you want to proceed?`
                : `You are about to subscribe to ${organisation.nameOfOrganisation}. You will receive email notifications whenever this organization creates a new activity. Do you want to proceed?`}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" ml={3} onClick={handleSubscribe}>
              {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};