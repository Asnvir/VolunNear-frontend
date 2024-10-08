import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
} from '@chakra-ui/react';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {Select} from 'chakra-react-select';
import DatePicker from 'react-datepicker';
import CustomDateInput from './CustomDateInput.tsx';
import {MdClear, MdSearch} from 'react-icons/md';
import {OrganisationActivitiesFilterValues} from '../../../api/validation/activitiesFilter/OrganisationActivitiesFilterValidation.ts';

type OrganisationActivitiesFilterFormProps = {
  control: Control<OrganisationActivitiesFilterValues>;
  titleOptions: {label: string; value: string}[];
  typeOptions: {label: string; value: string}[];
  countryOptions: {label: string; value: string}[];
  cityOptions: {label: string; value: string}[];
  selectedCountry?: {label: string; value: string} | null | undefined;
  handleFormSubmit: () => void;
  handleFormReset: () => void;
  errors: FieldErrors<OrganisationActivitiesFilterValues>;
  isSubmitting: boolean;
  isVisibleResetButton: boolean;
};

export const OrganisationActivitiesFilterForm = ({
  control,
  titleOptions,
  typeOptions,
  countryOptions,
  cityOptions,
  selectedCountry,
  handleFormSubmit,
  handleFormReset,
  errors,
  isSubmitting,
  isVisibleResetButton,
}: OrganisationActivitiesFilterFormProps) => {
  return (
    <Box
      w="full"
      p={4}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="full"
      boxShadow="md"
      bg="white"
      zIndex="3"
      position="relative"
    >
      <form onSubmit={handleFormSubmit}>
        <Flex justify="space-between" wrap="nowrap" align="center">
          <FormControl isInvalid={!!errors.title} flex="1" mx={2}>
            <Controller
              name="title"
              control={control}
              render={({field}) => (
                <Select
                  {...field}
                  placeholder="Title"
                  value={field.value || null}
                  options={titleOptions}
                  menuPortalTarget={document.body}
                  styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                />
              )}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>

          <Divider orientation="vertical" height="30px" />

          <FormControl isInvalid={!!errors.type} flex="1" mx={2}>
            <Controller
              name="type"
              control={control}
              render={({field}) => (
                <Select
                  {...field}
                  placeholder="Type"
                  options={typeOptions}
                  menuPortalTarget={document.body}
                  styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                />
              )}
            />
            <FormErrorMessage>
              {errors.type && errors.type.message}
            </FormErrorMessage>
          </FormControl>

          <Divider orientation="vertical" height="30px" />

          <FormControl isInvalid={!!errors.date} flex="1" mx={2}>
            <Controller
              name="date"
              control={control}
              render={({field}) => (
                <DatePicker
                  selected={field.value}
                  onChange={date => {
                    console.log(date);
                    field.onChange(date);
                  }}
                  minDate={new Date()}
                  customInput={
                    <CustomDateInput onClear={() => field.onChange(null)} />
                  }
                />
              )}
            />
            <FormErrorMessage>
              {errors.date && errors.date.message}
            </FormErrorMessage>
          </FormControl>

          <Divider orientation="vertical" height="30px" />

          <FormControl isInvalid={!!errors.country} flex="1" mx={2}>
            <Controller
              name="country"
              control={control}
              render={({field}) => (
                <Select
                  {...field}
                  placeholder="Country"
                  options={countryOptions}
                  menuPortalTarget={document.body}
                  styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                />
              )}
            />
            <FormErrorMessage>
              {errors.country && errors.country.message}
            </FormErrorMessage>
          </FormControl>

          <Divider orientation="vertical" height="30px" />

          <FormControl
            isInvalid={!!errors.city}
            flex="1"
            ml={2}
            isDisabled={!selectedCountry}
          >
            <Controller
              name="city"
              control={control}
              render={({field}) => (
                <Select
                  {...field}
                  placeholder="City"
                  options={cityOptions}
                  isDisabled={!selectedCountry}
                  menuPortalTarget={document.body}
                  styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                />
              )}
            />
            <FormErrorMessage>
              {errors.city && errors.city.message}
            </FormErrorMessage>
          </FormControl>

          <Divider orientation="vertical" height="30px" />

          <Button
            type="submit"
            variant="primary"
            color="white"
            borderRadius="full"
            ml={4}
            isLoading={isSubmitting}
            p={4}
          >
            <Icon as={MdSearch} w={6} h={6} />
          </Button>

          {isVisibleResetButton && (
            <Button
              type="button"
              variant="outline"
              color="black"
              borderRadius="full"
              ml={4}
              bg="gray.200"
              _hover={{bg: 'gray.400'}}
              onClick={handleFormReset}
              p={4}
            >
              <Icon as={MdClear} w={6} h={6} />
            </Button>
          )}
        </Flex>
      </form>
    </Box>
  );
};
