import {extendTheme} from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    primary: {
      500: '#FF7A00',
      300: '#FF9A33',
    },
    secondary: {
      500: '#4299E1',
      300: '#63B3ED',
    },
  },
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: 'Poppins, sans-serif',
        letterSpacing: 3,
        fontWeight: 'bold',
      },
      variants: {
        primary: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.300',
          },
        },
        secondary: {
          bg: 'secondary.500',
          color: 'white',
          _hover: {
            bg: 'secondary.300',
          },
        },
      },
    },
  },
});
