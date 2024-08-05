import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Stack,
  VStack,
  Flex,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, AddIcon } from '@chakra-ui/icons';
import { useGetVolunteerProfile } from '../hooks/volunteer/useGetVolunteerProfile/useGetVolunteerProfile';
import { useUpdateVolunteerProfile } from '../hooks/volunteer/useUpdateVolunteerProfile/useUpdateVolunteerProfile';
import {useUploadVolunteerAvatar} from '../hooks/files/useUploadVolunteerAvatar/useUploadVolunteerAvatar.ts';
import {useChangePassword} from '../hooks/auth/useChangePassword/useChangePassword.ts';

const VolunteerProfileSettings: React.FC = () => {
  const [initialEmail, setInitialEmail] = useState('');
  const [initialUsername, setInitialUsername] = useState('');
  const [initialRealName, setInitialRealName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const [email, setEmail] = useState(initialEmail);
  const [username, setUsername] = useState(initialUsername);
  const [realName, setRealName] = useState(initialRealName);
  const [volunteerId, setVolunteerId] = useState(''); //

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const toast = useToast();
  const { mutate: updateVolunteerProfile } = useUpdateVolunteerProfile();

  const { data: volunteerProfile } = useGetVolunteerProfile();

  const {mutate: uploadVolunteerAvatar} = useUploadVolunteerAvatar();

  const {mutate: changePassword} = useChangePassword();

  useEffect(() => {
    if (volunteerProfile) {
      console.log(volunteerProfile);
      setEmail(volunteerProfile.email ?? '');
      setUsername(volunteerProfile.username ?? '');
      setRealName(volunteerProfile.realName ?? '');
      setVolunteerId(volunteerProfile.id ?? '')
      console.log(volunteerProfile.avatarUrl ?? '');
      setAvatarUrl(volunteerProfile.avatarUrl ?? '');
      setInitialEmail(volunteerProfile.email ?? '');
      setInitialUsername(volunteerProfile.username ?? '');
      setInitialRealName(volunteerProfile.realName ?? '');
    }
  }, [volunteerProfile]);

  const handleSave = () => {
    updateVolunteerProfile(
      { email, username, realName, avatarUrl },
      {
        onSuccess: () => {
          toast({
            title: 'Profile updated',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        },
        onError: (error) => {
          toast({
            title: 'An error occurred',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
      }
    );
  };

  const handleCancel = () => {
    // Revert changes to initial values
    setEmail(initialEmail);
    setUsername(initialUsername);
    setRealName(initialRealName);
    setAvatarUrl(volunteerProfile?.avatarUrl ?? '');
    console.log('Changes reverted');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      uploadVolunteerAvatar(
        { formData, volunteerId },
        {
          onSuccess: (data) => {
            setAvatarUrl(data)
          },
          onError: (error) => {
            toast({
              title: 'An error occurred',
              description: error.message,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          },
        }
      );
    }
  };

  const validatePasswords = () => {
    if (newPassword !== confirmNewPassword) {
      toast({
        title: 'Error',
        description: "New passwords don't match!",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    if (newPassword.length < 8) {
      toast({
        title: 'Error',
        description: 'Password must be at least 8 characters long.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  const handleChangePassword = () => {
    if (!validatePasswords()) {
      return;
    }

    changePassword(
      { oldPassword, newPassword },
      {
        onSuccess: () => {
          toast({
            title: 'Password changed',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          setOldPassword('');
          setNewPassword('');
          setConfirmNewPassword('');
        },
        onError: (error) => {
          toast({
            title: 'An error occurred',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
      }
    );
  };

  return (
    <Flex direction="column" flex="1" alignItems="center" justifyContent="center" width="full">
      <Box bg="white" p={6} rounded="md" boxShadow="xl" maxW="600px" w="full">
        <VStack spacing={8} align="stretch">
          <Flex justify="center" position="relative">
            <Avatar size="xl" src={avatarUrl} />
            <Input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
              id="avatarUpload"
            />
            <IconButton
              aria-label="Upload new avatar"
              icon={<AddIcon />}
              position="absolute"
              bottom={0}
              right={230}
              size="sm"
              onClick={() => document.getElementById('avatarUpload')?.click()}
            />
          </Flex>
          <Heading as="h2" size="lg" textAlign="center">
            Edit Profile
          </Heading>
          <Tabs variant="enclosed" isFitted>
            <TabList>
              <Tab>General</Tab>
              <Tab>Password</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FormControl id="username">
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl id="realName">
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    value={realName}
                    onChange={(e) => setRealName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <Stack direction="row" spacing={4} justify="flex-end" mt={4}>
                  <Button variant="outline" colorScheme="orange" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button colorScheme="orange" onClick={handleSave}>
                    Save
                  </Button>
                </Stack>
              </TabPanel>
              <TabPanel>
                <FormControl id="currentPassword">
                  <FormLabel>Current Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        aria-label="Toggle Password Visibility"
                        icon={showCurrentPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="newPassword">
                  <FormLabel>New Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        aria-label="Toggle Password Visibility"
                        icon={showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="confirmNewPassword">
                  <FormLabel>Confirm New Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showConfirmNewPassword ? 'text' : 'password'}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        aria-label="Toggle Password Visibility"
                        icon={showConfirmNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button mt={4} colorScheme="orange" onClick={handleChangePassword}>
                  Change Password
                </Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Box>
    </Flex>
  );
};

export default VolunteerProfileSettings;
