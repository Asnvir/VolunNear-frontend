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
import {Select, SingleValue} from 'chakra-react-select';
import {useSetActivitiesFilters} from '../../../hooks/activities/useSetActivitiesFilters/useSetActivitiesFilters.ts';
import {ActivitiesFiltersType} from '../../../api/services/activities/service/types.ts';
import {ActivitiesFilterProps} from './types.ts';
import {useGetActivitiesTitles} from '../../../hooks/activities/useGetActivitiesTitles/useGetActivitiesTitles.ts';
import {useGetActivitiesTypes} from '../../../hooks/activities/useGetActivitiesTypes/useGetActivitiesTypes.ts';
import {useGetCountriesCities} from '../../../hooks/forms/useGetCountriesCities/useGetCountriesCities.ts';

export const ActivitiesFilter = ({onApply}: ActivitiesFilterProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<ActivitiesFiltersType>();

  const {
    data: activitiesTitles,
    isLoading: isLoadingTitles,
    error: errorTitles,
  } = useGetActivitiesTitles();

  const titleOptions = activitiesTitles?.map((title: string) => ({
    label: title,
    value: title,
  }));

  const {
    data: activitiesTypes,
    isLoading: isLoadingTypes,
    error: errorTypes,
  } = useGetActivitiesTypes();

  const typeOptions = activitiesTypes?.map((type: string) => ({
    label: type,
    value: type,
  }));

  const {
    data: countriesCities,
    isLoading: isLoadingCountriesCities,
    error: errorCountriesCities,
  } = useGetCountriesCities();
  console.log(`countriesCities: ${JSON.stringify(countriesCities)}`);
  console.log(`isLoadingCountriesCities: ${isLoadingCountriesCities}`);
  console.log(`errorCountriesCities: ${errorCountriesCities}`);

  const {
    updateFilters,
    isLoading: isLoadingFilters,
    error: errorFilters,
  } = useSetActivitiesFilters();

  const onSubmit: SubmitHandler<ActivitiesFiltersType> = filters => {
    onApply(filters);
    updateFilters(filters);
  };

  if (isLoadingFilters) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (errorFilters) {
    return (
      <Alert status="error">
        <AlertIcon />
        {errorFilters}
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
          <FormControl isInvalid={!!errors.title} p={4}>
            <FormLabel>Title</FormLabel>
            {isLoadingTitles ? (
              <Select placeholder="Loading..." isDisabled />
            ) : errorTitles ? (
              <Select placeholder="Error loading titles" isDisabled />
            ) : (
              <Select
                placeholder="Select title"
                options={titleOptions}
                onChange={(
                  option: SingleValue<{label: string; value: string}>
                ) => setValue('title', option?.value || '')}
              />
            )}
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.type}>
            <FormLabel>Type</FormLabel>
            {isLoadingTypes ? (
              <Select placeholder="Loading..." isDisabled />
            ) : errorTypes ? (
              <Select placeholder="Error loading types" isDisabled />
            ) : (
              <Select
                placeholder="Select type"
                options={typeOptions}
                onChange={(
                  option: SingleValue<{label: string; value: string}>
                ) => setValue('type', option?.value || '')}
              />
            )}
            <FormErrorMessage>
              {errors.type && errors.type.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.date}>
            <FormLabel>Date</FormLabel>
            <Input placeholder="Date" {...register('date')} />
            <FormErrorMessage>
              {errors.date && errors.date.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.city}>
            <FormLabel>City</FormLabel>
            <Input placeholder="City" {...register('city')} />
            <FormErrorMessage>
              {errors.city && errors.city.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.country}>
            <FormLabel>Country</FormLabel>
            <Input placeholder="Country" {...register('country')} />
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
