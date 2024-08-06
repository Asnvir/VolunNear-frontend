import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Stack,
  HStack,
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
import { useUploadOrganisationAvatar } from '../hooks/files/useUploadOrganisationAvatar/useUploadOrganisationAvatar';
import { useChangePassword } from '../hooks/auth/useChangePassword/useChangePassword.ts';
import { useUpdateOrganizationProfile } from '../hooks/organizations/useUpdateOrganizationProfile/useUpdateOrganizationProfile.ts';
import { useGetOrganizationProfile } from '../hooks/organizations/useGetOrganizationProfile/useGetOrganizationProfile.tsx';

const OrganisationProfileSettings: React.FC = () => {
  const [initialEmail, setInitialEmail] = useState('');
  const [initialUsername, setInitialUsername] = useState('');
  const [initialNameOfOrganisation, setInitialNameOfOrganisation] = useState('');
  const [initialCountry, setInitialCountry] = useState('');
  const [initialCity, setInitialCity] = useState('');
  const [initialAddress, setInitialAddress] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const [email, setEmail] = useState(initialEmail);
  const [username, setUsername] = useState(initialUsername);
  const [nameOfOrganisation, setNameOfOrganisation] = useState(initialNameOfOrganisation);
  const [country, setCountry] = useState(initialCountry);
  const [city, setCity] = useState(initialCity);
  const [address, setAddress] = useState(initialAddress);
  const [id, setId] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const toast = useToast();
  const { mutate: updateOrganisationProfile } = useUpdateOrganizationProfile();
  const { data: organisationProfile } = useGetOrganizationProfile();
  const { mutate: uploadOrganisationAvatar } = useUploadOrganisationAvatar();
  const { mutate: changeOrganisationPassword } = useChangePassword();

  useEffect(() => {
    if (organisationProfile) {
      setEmail(organisationProfile.organisationResponseDTO?.email ?? '');
      setUsername(organisationProfile.organisationResponseDTO?.username ?? '');
      setNameOfOrganisation(organisationProfile.organisationResponseDTO?.nameOfOrganisation ?? '');
      setCountry(organisationProfile.organisationResponseDTO?.country ?? '');
      setCity(organisationProfile.organisationResponseDTO?.city ?? '');
      setAddress(organisationProfile.organisationResponseDTO?.address ?? '');
      setId(organisationProfile.organisationResponseDTO?.id ?? '');
      setAvatarUrl(organisationProfile.organisationResponseDTO?.avatarUrl ?? '');
      setInitialEmail(organisationProfile.organisationResponseDTO?.email ?? '');
      setInitialUsername(organisationProfile.organisationResponseDTO?.username ?? '');
      setInitialNameOfOrganisation(organisationProfile.organisationResponseDTO?.nameOfOrganisation ?? '');
      setInitialCountry(organisationProfile.organisationResponseDTO?.country ?? '');
      setInitialCity(organisationProfile.organisationResponseDTO?.city ?? '');
      setInitialAddress(organisationProfile.organisationResponseDTO?.address ?? '');
    }
  }, [organisationProfile]);

  const handleSave = () => {
    updateOrganisationProfile(
      { email, username, nameOfOrganisation, country, city, address, avatarUrl },
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
    setEmail(initialEmail);
    setUsername(initialUsername);
    setNameOfOrganisation(initialNameOfOrganisation);
    setCountry(initialCountry);
    setCity(initialCity);
    setAddress(initialAddress);
    setAvatarUrl(organisationProfile?.organisationResponseDTO?.avatarUrl ?? '');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      uploadOrganisationAvatar(
        { formData, id },
        {
          onSuccess: (data) => {
            setAvatarUrl(data);
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

    changeOrganisationPassword(
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
      <Box bg="white" p={6} rounded="md" boxShadow="xl" maxW="1200px" w="full">
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
              right={525}
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
                <HStack spacing={4}>
                  <FormControl id="username">
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="nameOfOrganisation">
                    <FormLabel>Name of Organisation</FormLabel>
                    <Input
                      type="text"
                      value={nameOfOrganisation}
                      onChange={(e) => setNameOfOrganisation(e.target.value)}
                    />
                  </FormControl>
                </HStack>
                <HStack spacing={4} mt={4}>
                  <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="country">
                    <FormLabel>Country</FormLabel>
                    <Input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </FormControl>
                </HStack>
                <HStack spacing={4} mt={4}>
                  <FormControl id="city">
                    <FormLabel>City</FormLabel>
                    <Input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="address">
                    <FormLabel>Address</FormLabel>
                    <Input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </FormControl>
                </HStack>
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
                <Flex direction="column" align="center" justify="center" width="full">
                  <Box width="60%">
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
                    <FormControl id="newPassword" mt={4}>
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
                    <FormControl id="confirmNewPassword" mt={4}>
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
                  </Box>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Box>
    </Flex>
  );
};

export default OrganisationProfileSettings;