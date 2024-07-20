import {SubmitHandler, useForm} from 'react-hook-form';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import {useSetActivitiesFilters} from '../../../hooks/activities/useSetActivitiesFilters/useSetActivitiesFilters.ts';
import {ActivitiesFiltersType} from '../../../api/services/activities/service/types.ts';
import {ActivitiesFilterProps} from './types.ts';

export const ActivitiesFilter = ({onApply}: ActivitiesFilterProps) => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<ActivitiesFiltersType>();

  const {
    updateFilters,
    isLoading,
    error: errorOnServer,
  } = useSetActivitiesFilters();

  const onSubmit: SubmitHandler<ActivitiesFiltersType> = filters => {
    onApply(filters);
    updateFilters(filters);
  };

  if (isLoading) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (errorOnServer) {
    return (
      <Alert status="error">
        <AlertIcon />
        {errorOnServer}
      </Alert>
    );
  }

  return (
    <Box
      w="full"
      p={4}
      border="1px solid"
      borderColor="orange.400"
      borderRadius="md"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={6} spacing={4}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Title"
              {...register('title', {required: 'Title is required'})}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.date}>
            <FormLabel>Date</FormLabel>
            <Input
              placeholder="Date"
              {...register('date', {required: 'Date is required'})}
            />
            <FormErrorMessage>
              {errors.date && errors.date.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.type}>
            <FormLabel>Type</FormLabel>
            <Input
              placeholder="Type"
              {...register('type', {required: 'Type is required'})}
            />
            <FormErrorMessage>
              {errors.type && errors.type.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.city}>
            <FormLabel>City</FormLabel>
            <Input
              placeholder="City"
              {...register('city', {required: 'City is required'})}
            />
            <FormErrorMessage>
              {errors.city && errors.city.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.country}>
            <FormLabel>Country</FormLabel>
            <Input
              placeholder="Country"
              {...register('country', {required: 'Country is required'})}
            />
            <FormErrorMessage>
              {errors.country && errors.country.message}
            </FormErrorMessage>
          </FormControl>
        </SimpleGrid>
        <Button
          type="submit"
          colorScheme="teal"
          mt={4}
          isLoading={isSubmitting}
        >
          Apply
        </Button>
      </form>
    </Box>
  );
};
