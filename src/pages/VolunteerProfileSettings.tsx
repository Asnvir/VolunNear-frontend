import React, { useEffect, useState } from 'react';
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
import { useForm, Controller } from 'react-hook-form';
import { useGetVolunteerProfile } from '../hooks/volunteer/useGetVolunteerProfile/useGetVolunteerProfile';
import { useUpdateVolunteerProfile } from '../hooks/volunteer/useUpdateVolunteerProfile/useUpdateVolunteerProfile';
import { useUploadVolunteerAvatar } from '../hooks/files/useUploadVolunteerAvatar/useUploadVolunteerAvatar.ts';
import {useChangePassword} from '../hooks/auth/useChangePassword/useChangePassword.ts';

const VolunteerProfileSettings: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // Separate useForm instances for each form
  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm();

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm();

  const toast = useToast();

  const { data: volunteerProfile, refetch } = useGetVolunteerProfile();
  const { mutate: updateVolunteerProfile } = useUpdateVolunteerProfile();
  const { mutate: uploadVolunteerAvatar } = useUploadVolunteerAvatar();
  const { mutate: changePassword } = useChangePassword();

  useEffect(() => {
    if (volunteerProfile) {
      resetProfile({
        email: volunteerProfile.email ?? '',
        username: volunteerProfile.username ?? '',
        realName: volunteerProfile.realName ?? '',
      });
      setAvatarUrl(volunteerProfile.avatarUrl ?? '');
    }
  }, [volunteerProfile, resetProfile]);

  const handleSave = (data) => {
    console.log("Form data:", data);
    updateVolunteerProfile(
      { ...data },
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

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      uploadVolunteerAvatar(
        { formData, id: volunteerProfile.id },
        {
          onSuccess: (data) => {
            setAvatarUrl(data);
            refetch(); // Refetch the profile data after successful upload
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

  const validatePasswords = (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast({
        title: 'Error',
        description: "New passwords don't match!",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    if (data.newPassword.length < 8) {
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

  const handleChangePassword = (data) => {
    if (!validatePasswords(data)) {
      return;
    }

    changePassword(
      { oldPassword: data.oldPassword, newPassword: data.newPassword },
      {
        onSuccess: () => {
          toast({
            title: 'Password changed',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          resetPassword({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
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
                <form onSubmit={handleProfileSubmit((data) => {
                  console.log("Form data:", data);
                  handleSave(data);
                })}>
                  <FormControl id="username" isInvalid={profileErrors.username}>
                    <FormLabel>Username</FormLabel>
                    <Controller
                      name="username"
                      control={profileControl}
                      rules={{ required: "Username is required" }}
                      render={({ field }) => (
                        <Input type="text" {...field} />
                      )}
                    />
                    {profileErrors.username && <Box color="red.500">{profileErrors.username.message}</Box>}
                  </FormControl>
                  <FormControl id="realName" isInvalid={profileErrors.realName}>
                    <FormLabel>Full Name</FormLabel>
                    <Controller
                      name="realName"
                      control={profileControl}
                      rules={{ required: "Full Name is required" }}
                      render={({ field }) => (
                        <Input type="text" {...field} />
                      )}
                    />
                    {profileErrors.realName && <Box color="red.500">{profileErrors.realName.message}</Box>}
                  </FormControl>
                  <FormControl id="email" isInvalid={profileErrors.email}>
                    <FormLabel>Email</FormLabel>
                    <Controller
                      name="email"
                      control={profileControl}
                      rules={{ required: "Email is required" }}
                      render={({ field }) => (
                        <Input type="email" {...field} />
                      )}
                    />
                    {profileErrors.email && <Box color="red.500">{profileErrors.email.message}</Box>}
                  </FormControl>
                  <Stack direction="row" spacing={4} justify="flex-end" mt={4}>
                    <Button variant="outline" colorScheme="orange" onClick={() => resetProfile()}>
                      Cancel
                    </Button>
                    <Button colorScheme="orange" type="submit">
                      Save
                    </Button>
                  </Stack>
                </form>
              </TabPanel>
              <TabPanel>
                <form onSubmit={handlePasswordSubmit(handleChangePassword)}>
                  <FormControl id="currentPassword" isInvalid={passwordErrors.oldPassword}>
                    <FormLabel>Current Password</FormLabel>
                    <InputGroup>
                      <Controller
                        name="oldPassword"
                        control={passwordControl}
                        rules={{ required: "Current password is required" }}
                        render={({ field }) => (
                          <Input
                            type={showCurrentPassword ? 'text' : 'password'}
                            {...field}
                          />
                        )}
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
                    {passwordErrors.oldPassword && <Box color="red.500">{passwordErrors.oldPassword.message}</Box>}
                  </FormControl>
                  <FormControl id="newPassword" isInvalid={passwordErrors.newPassword}>
                    <FormLabel>New Password</FormLabel>
                    <InputGroup>
                      <Controller
                        name="newPassword"
                        control={passwordControl}
                        rules={{
                          required: "New password is required",
                          minLength: { value: 8, message: "Password must be at least 8 characters long" },
                        }}
                        render={({ field }) => (
                          <Input
                            type={showNewPassword ? 'text' : 'password'}
                            {...field}
                          />
                        )}
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
                    {passwordErrors.newPassword && <Box color="red.500">{passwordErrors.newPassword.message}</Box>}
                  </FormControl>
                  <FormControl id="confirmNewPassword" isInvalid={passwordErrors.confirmNewPassword}>
                    <FormLabel>Confirm New Password</FormLabel>
                    <InputGroup>
                      <Controller
                        name="confirmNewPassword"
                        control={passwordControl}
                        rules={{ required: "Please confirm your new password" }}
                        render={({ field }) => (
                          <Input
                            type={showConfirmNewPassword ? 'text' : 'password'}
                            {...field}
                          />
                        )}
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
                    {passwordErrors.confirmNewPassword && <Box color="red.500">{passwordErrors.confirmNewPassword.message}</Box>}
                  </FormControl>
                  <Button mt={4} colorScheme="orange" type="submit">
                    Change Password
                  </Button>
                </form>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Box>
    </Flex>
  );
};

export default VolunteerProfileSettings;