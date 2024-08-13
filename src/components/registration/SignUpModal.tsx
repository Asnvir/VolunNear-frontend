import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import {useState} from 'react';
import {
  ROLE_ORGANISATION,
  ROLE_VOLUNTEER,
} from '../../utils/constants/authConstants.ts';
import {useNavigate} from 'react-router-dom';
import {
  ROUTE_ORGANIZATION_REGISTRATION,
  ROUTE_VOLUNTEER_REGISTRATION,
} from '../../utils/constants/routesConstants.ts';

type SignUpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SignUpModal = ({isOpen, onClose}: SignUpModalProps) => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    if (value === ROLE_ORGANISATION) {
      navigate(ROUTE_ORGANIZATION_REGISTRATION);
    } else if (value === ROLE_VOLUNTEER) {
      navigate(ROUTE_VOLUNTEER_REGISTRATION);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create an account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RadioGroup onChange={setValue} value={value} colorScheme="primary">
            <Stack direction="column">
              <Radio value={ROLE_VOLUNTEER}>Volunteer</Radio>
              <Radio value={ROLE_ORGANISATION}>Organisation</Radio>
            </Stack>
          </RadioGroup>
        </ModalBody>

        <ModalFooter>
          <Button variant="primary" onClick={handleRegisterClick}>
            Register
          </Button>
          <Button
            type="button"
            variant="outline"
            color="black"
            ml={4}
            bg="gray.300"
            _hover={{bg: 'gray.500'}}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
