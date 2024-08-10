import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import React from 'react';
import {CalendarIcon, CloseIcon} from '@chakra-ui/icons';

type CustomDateInputProps = {
  value: string | undefined; // The value can be a string or undefined
  onClick: () => void; // The onClick handler is a function with no arguments
  onClear: () => void; // The onClear handler is a function with no arguments
};

const CustomDateInput = React.forwardRef<
  HTMLInputElement,
  CustomDateInputProps
>(({value, onClick, onClear}, ref) => (
  <InputGroup width="100%" height="40px">
    <InputLeftElement height="40px">
      {!value ? (
        <IconButton
          aria-label="Select date"
          icon={<CalendarIcon />}
          onClick={onClick}
          variant="ghost"
          size="sm"
        />
      ) : (
        <IconButton
          aria-label="Clear date"
          icon={<CloseIcon />}
          onClick={onClear}
          variant="ghost"
          size="sm"
        />
      )}
    </InputLeftElement>
    <Input
      // onClick={onClick}
      ref={ref}
      value={value || ''} // Ensure value is a string, fallback to empty string if undefined
      readOnly
      width="100%"
      height="40px"
      fontSize="16px"
      paddingLeft="40px" // Adjust padding to accommodate the icon
      variant="outline"
    />
  </InputGroup>
));
CustomDateInput.displayName = 'CustomDateInput';

export default CustomDateInput;
