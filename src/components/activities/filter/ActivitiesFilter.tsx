import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import {Select} from 'chakra-react-select';
import {SingleDatepicker} from 'chakra-dayzed-datepicker';
import {useActivitiesFilterForm} from '../../../hooks/activities/useActivitiesFilterForm/useActivitiesFilterForm.tsx';
import {Controller} from 'react-hook-form';

export const ActivitiesFilter = () => {
  const {
    activitiesTitleOptions,
    activitiesTypeOptions,
    selectedCountry,
    activitiesCountryOption,
    activitiesCityOptions,
    date,
    handleReset,
    handleFormSubmit,
    control,
    formState: {errors, isSubmitting}, // Nested destructuring
  } = useActivitiesFilterForm();

  console.log(activitiesCityOptions);
  return (
    <Box
      w="full"
      p={4}
      border="1px solid"
      borderColor="orange.400"
      borderRadius="md"
    >
      <form onSubmit={handleFormSubmit}>
        <Flex justify="space-between" wrap="wrap" gap={4}>
          <FormControl isInvalid={!!errors.title} flex="1">
            <Controller
              name="title"
              control={control}
              render={({field}) => (
                <Select
                  {...field}
                  placeholder="Select title"
                  options={activitiesTitleOptions}
                />
              )}
            />

            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.type} flex="1">
            <Controller
              name="type"
              control={control}
              render={({field}) => (
                <Select
                  {...field}
                  placeholder="Select type"
                  options={activitiesTypeOptions}
                  // onChange={handleTypeChange}
                />
              )}
            />

            <FormErrorMessage>
              {errors.type && errors.type.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.date} flex="1">
            <InputGroup width="100%">
              {!date && (
                <InputLeftElement pointerEvents="none" color="gray.400">
                  <Text>Select date</Text>
                </InputLeftElement>
              )}
              <Box width="100%">
                <Controller
                  name="date"
                  control={control}
                  render={({field: {ref, ...field}}) => (
                    <SingleDatepicker
                      {...field}
                      date={field.value}
                      onDateChange={field.onChange}
                      usePortal={true}
                    />
                  )}
                />
              </Box>
            </InputGroup>
            <FormErrorMessage>
              {errors.date && errors.date.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.country} flex="1">
            <Controller
              name="country"
              control={control}
              render={({field}) => (
                <Select
                  {...field}
                  placeholder="Select country"
                  options={activitiesCountryOption}
                />
              )}
            />

            <FormErrorMessage>
              {errors.country && errors.country.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={!!errors.city}
            flex="1"
            isDisabled={!selectedCountry}
          >
            <Controller
              name="city"
              control={control}
              render={({field}) => (
                <Select
                  {...field}
                  placeholder="Select city"
                  options={activitiesCityOptions}
                  isDisabled={!selectedCountry}
                />
              )}
            />

            <FormErrorMessage>
              {errors.city && errors.city.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>

        <Flex justify="center" mt={4}>
          <Button
            type="submit"
            bg="orange.400"
            color="white"
            borderColor="orange.400"
            borderWidth="2px" // Ensures the border is visible
            mr={4}
            isLoading={isSubmitting}
            _hover={{
              bg: 'orange.500', // Darker shade on hover
              borderColor: 'orange.500',
            }}
          >
            Search
          </Button>
          <Button
            onClick={handleReset}
            bg="gray.200"
            color="black"
            borderColor="gray.400"
            borderWidth="2px"
            isDisabled={isSubmitting}
            _hover={{
              bg: 'gray.300',
              borderColor: 'gray.500',
            }}
          >
            Reset
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
