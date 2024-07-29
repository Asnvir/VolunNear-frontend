import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack,
    useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const RegistrationTypeModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const bgColor = useColorModeValue('white', 'gray.800');

    const handleChoice = (type) => {
        onClose();
        navigate(`/registration/${type}`);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent bg={bgColor} borderRadius="md" boxShadow="xl">
                <ModalHeader textAlign="center" paddingBottom="0">
                    Choose Registration Type
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody padding="6">
                    <VStack spacing={4}>
                        <Button variant="primary" onClick={() => handleChoice('volunteer')} width="full" colorScheme="teal">
                            Volunteer
                        </Button>
                        <Button variant="primary" onClick={() => handleChoice('organization')} width="full" colorScheme="teal">
                            Organization
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
