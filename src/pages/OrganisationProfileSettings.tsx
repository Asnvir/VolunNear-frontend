import React, { useEffect, useState } from 'react';
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
import { useForm, Controller } from 'react-hook-form';
import { useUploadOrganisationAvatar } from '../hooks/files/useUploadOrganisationAvatar/useUploadOrganisationAvatar';
import { useChangePassword } from '../hooks/auth/useChangePassword/useChangePassword.ts';
import { useUpdateOrganizationProfile } from '../hooks/organizations/useUpdateOrganizationProfile/useUpdateOrganizationProfile.ts';
import { useGetOrganizationProfile } from '../hooks/organizations/useGetOrganizationProfile/useGetOrganizationProfile.tsx';

const OrganisationProfileSettings: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const toast = useToast();
  const { mutate: updateOrganisationProfile } = useUpdateOrganizationProfile();
  const { data: organisationProfile } = useGetOrganizationProfile();
  const { mutate: uploadOrganisationAvatar } = useUploadOrganisationAvatar();
  const { mutate: changeOrganisationPassword } = useChangePassword();

  // State for toggling password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  useEffect(() => {
    if (organisationProfile) {
      reset({
        email: organisationProfile.organisationResponseDTO?.email ?? '',
        username: organisationProfile.organisationResponseDTO?.username ?? '',
        nameOfOrganisation: organisationProfile.organisationResponseDTO?.nameOfOrganisation ?? '',
        country: organisationProfile.organisationResponseDTO?.country ?? '',
        city: organisationProfile.organisationResponseDTO?.city ?? '',
        address: organisationProfile.organisationResponseDTO?.address ?? '',
      });
    }
  }, [organisationProfile, reset]);

  const onSubmit = (data) => {
    updateOrganisationProfile(
      {
        email: data.email,
        username: data.username,
        nameOfOrganisation: data.nameOfOrganisation,
        country: data.country,
        city: data.city,
        address: data.address,
        avatarUrl: data.avatarUrl,
      },
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

  const handleChangePassword = (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast({
        title: 'Error',
        description: "New passwords don't match!",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    changeOrganisationPassword(
      { oldPassword: data.oldPassword, newPassword: data.newPassword },
      {
        onSuccess: () => {
          toast({
            title: 'Password changed',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          reset({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
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
            <Avatar size="xl" src={organisationProfile?.organisationResponseDTO?.avatarUrl} />
            <Input
              type="file"
              accept="image/*"
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <HStack spacing={4}>
                    <FormControl id="username" isInvalid={errors.username}>
                      <FormLabel>Username</FormLabel>
                      <Controller
                        name="username"
                        control={control}
                        rules={{ required: "Username is required" }}
                        render={({ field }) => (
                          <Input type="text" {...field} />
                        )}
                      />
                      {errors.username && (
                        <Box color="red.500">{errors.username.message}</Box>
                      )}
                    </FormControl>
                    <FormControl id="nameOfOrganisation" isInvalid={errors.nameOfOrganisation}>
                      <FormLabel>Name of Organisation</FormLabel>
                      <Controller
                        name="nameOfOrganisation"
                        control={control}
                        rules={{ required: "Name of Organisation is required" }}
                        render={({ field }) => (
                          <Input type="text" {...field} />
                        )}
                      />
                      {errors.nameOfOrganisation && (
                        <Box color="red.500">{errors.nameOfOrganisation.message}</Box>
                      )}
                    </FormControl>
                  </HStack>
                  <HStack spacing={4} mt={4}>
                    <FormControl id="email" isInvalid={errors.email}>
                      <FormLabel>Email</FormLabel>
                      <Controller
                        name="email"
                        control={control}
                        rules={{ required: "Email is required" }}
                        render={({ field }) => (
                          <Input type="email" {...field} />
                        )}
                      />
                      {errors.email && (
                        <Box color="red.500">{errors.email.message}</Box>
                      )}
                    </FormControl>
                    <FormControl id="country" isInvalid={errors.country}>
                      <FormLabel>Country</FormLabel>
                      <Controller
                        name="country"
                        control={control}
                        rules={{ required: "Country is required" }}
                        render={({ field }) => (
                          <Input type="text" {...field} />
                        )}
                      />
                      {errors.country && (
                        <Box color="red.500">{errors.country.message}</Box>
                      )}
                    </FormControl>
                  </HStack>
                  <HStack spacing={4} mt={4}>
                    <FormControl id="city" isInvalid={errors.city}>
                      <FormLabel>City</FormLabel>
                      <Controller
                        name="city"
                        control={control}
                        rules={{ required: "City is required" }}
                        render={({ field }) => (
                          <Input type="text" {...field} />
                        )}
                      />
                      {errors.city && (
                        <Box color="red.500">{errors.city.message}</Box>
                      )}
                    </FormControl>
                    <FormControl id="address" isInvalid={errors.address}>
                      <FormLabel>Address</FormLabel>
                      <Controller
                        name="address"
                        control={control}
                        rules={{ required: "Address is required" }}
                        render={({ field }) => (
                          <Input type="text" {...field} />
                        )}
                      />
                      {errors.address && (
                        <Box color="red.500">{errors.address.message}</Box>
                      )}
                    </FormControl>
                  </HStack>
                  <Stack direction="row" spacing={4} justify="flex-end" mt={4}>
                    <Button variant="outline" colorScheme="orange">
                      Cancel
                    </Button>
                    <Button colorScheme="orange" type="submit">
                      Save
                    </Button>
                  </Stack>
                </form>
              </TabPanel>
              <TabPanel>
                <form onSubmit={handleSubmit(handleChangePassword)}>
                  <Flex direction="column" align="center" justify="center" width="full">
                    <Box width="60%">
                      <FormControl id="currentPassword" isInvalid={errors.oldPassword}>
                        <FormLabel>Current Password</FormLabel>
                        <InputGroup>
                          <Controller
                            name="oldPassword"
                            control={control}
                            rules={{ required: "Current password is required" }}
                            render={({ field }) => (
                              <Input
                                type={showCurrentPassword ? "text" : "password"}
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
                        {errors.oldPassword && (
                          <Box color="red.500">{errors.oldPassword.message}</Box>
                        )}
                      </FormControl>
                      <FormControl id="newPassword" mt={4} isInvalid={errors.newPassword}>
                        <FormLabel>New Password</FormLabel>
                        <InputGroup>
                          <Controller
                            name="newPassword"
                            control={control}
                            rules={{ required: "New password is required", minLength: { value: 8, message: "Password must be at least 8 characters long" } }}
                            render={({ field }) => (
                              <Input
                                type={showNewPassword ? "text" : "password"}
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
                        {errors.newPassword && (
                          <Box color="red.500">{errors.newPassword.message}</Box>
                        )}
                      </FormControl>
                      <FormControl id="confirmNewPassword" mt={4} isInvalid={errors.confirmNewPassword}>
                        <FormLabel>Confirm New Password</FormLabel>
                        <InputGroup>
                          <Controller
                            name="confirmNewPassword"
                            control={control}
                            rules={{ required: "Please confirm your new password" }}
                            render={({ field }) => (
                              <Input
                                type={showConfirmNewPassword ? "text" : "password"}
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
                        {errors.confirmNewPassword && (
                          <Box color="red.500">{errors.confirmNewPassword.message}</Box>
                        )}
                      </FormControl>
                      <Button mt={4} colorScheme="orange" type="submit">
                        Change Password
                      </Button>
                    </Box>
                  </Flex>
                </form>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Box>
    </Flex>
  );
};

export default OrganisationProfileSettings;
