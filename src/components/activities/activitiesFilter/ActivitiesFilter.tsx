import {SubmitHandler, useForm} from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import {Select, SingleValue} from 'chakra-react-select';
import {ActivitiesFiltersType} from '../../../api/services/activities/service/types.ts';
import {ActivitiesFilterProps} from './types.ts';
import {useGetActivitiesTitles} from '../../../hooks/activities/useGetActivitiesTitles/useGetActivitiesTitles.ts';
import {useGetActivitiesTypes} from '../../../hooks/activities/useGetActivitiesTypes/useGetActivitiesTypes.ts';
import {useGetCountriesCities} from '../../../hooks/forms/useGetCountriesCities/useGetCountriesCities.ts';
import {useEffect, useState} from 'react';
import {SingleDatepicker} from 'chakra-dayzed-datepicker';
import {zodResolver} from '@hookform/resolvers/zod';
import {ActivitiesFilterValidationSchema} from '../../../api/validation/activitiesFilter/ActivitiesFilterValidation.ts';
import {ActivitiesFilterValues} from '../../../api/validation/activitiesFilter/types.ts';
import {useActivitiesFiltersContext} from '../../../shared/hooks/useActivitiesFiltersContext.ts';

export const ActivitiesFilter = ({onApply}: ActivitiesFilterProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors, isSubmitting},
  } = useForm<ActivitiesFilterValues>({
    resolver: zodResolver(ActivitiesFilterValidationSchema),
  });
  const {setFilters} = useActivitiesFiltersContext();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [cities, setCities] = useState<string[]>([]);
  const selectedCountry = watch('country');

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

  useEffect(() => {
    if (selectedCountry && countriesCities) {
      const countryData = countriesCities.find(
        country => country.country === selectedCountry
      );
      if (countryData) {
        setCities(countryData.cities);
      } else {
        setCities([]);
      }
    } else {
      setCities([]);
    }
  }, [selectedCountry, countriesCities]);

  useEffect(() => {
    register('date'); // Register the date field
  }, [register]);

  useEffect(() => {
    setValue('date', date?.toISOString()); // Update the form value whenever date changes
  }, [date, setValue]);

  const onSubmit: SubmitHandler<ActivitiesFiltersType> = filters => {
    onApply(filters);
    setFilters(filters);
  };

  if (isLoadingCountriesCities) {
    return <Spinner />;
  }

  if (errorCountriesCities) {
    return (
      <Text color="red.500">Failed to load countries and cities data</Text>
    );
  }

  const handleCountryChange = (
    option: SingleValue<{value: string; label: string}>
  ) => {
    setValue('country', option?.value || '');
  };

  const handleCityChange = (
    option: SingleValue<{value: string; label: string}>
  ) => {
    setValue('city', option?.value || '');
  };

  const handleDateChange = (date: Date) => {
    console.log(`Chosen date: ${date}`);
    setDate(date);
  };

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
            <SingleDatepicker
              name="date-input"
              date={date}
              onDateChange={handleDateChange}
            />
            <FormErrorMessage>
              {errors.date && errors.date.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.country}>
            <FormLabel>Country</FormLabel>
            <Select
              options={countriesCities?.map(country => ({
                value: country.country,
                label: country.country,
              }))}
              placeholder="Select country"
              onChange={handleCountryChange}
            />
            <FormErrorMessage>
              {errors.country && errors.country.message}
            </FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        <FormControl isInvalid={!!errors.city} isDisabled={!selectedCountry}>
          <FormLabel>City</FormLabel>
          <Select
            options={cities.map(city => ({
              value: city,
              label: city,
            }))}
            placeholder="Select city"
            onChange={handleCityChange}
            isDisabled={!selectedCountry}
          />
          <FormErrorMessage>
            {errors.city && errors.city.message}
          </FormErrorMessage>
        </FormControl>

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
