import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import React from 'react';
import {CalendarIcon, CloseIcon} from '@chakra-ui/icons';

// eslint-disable-next-line react/display-name
const CustomDateInput = React.forwardRef(({value, onClick, onClear}, ref) => (
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
      onClick={onClick}
      ref={ref}
      value={value}
      readOnly
      width="100%"
      height="40px"
      fontSize="16px"
      paddingLeft="40px" // Adjust padding to accommodate the icon
      variant="outline"
    />
  </InputGroup>
));

export default CustomDateInput;
