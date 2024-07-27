import {extendTheme} from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: 'Poppins, sans-serif',
        letterSpacing: 2,
        fontWeight: 'bold',
      },
      variants: {
        primary: {
          bg: 'orange.400',
          color: 'white',
          _hover: {
            bg: 'orange.300',
          },
        },
        secondary: {
          bg: 'blue.400',
          color: 'white',
          _hover: {
            bg: 'blue.300',
          },
        },
      },
    },
    colors: {
      primary: {
        400: 'orange.400',
        300: 'orange.300',
      },
      secondary: {
        400: 'blue.400',
        300: 'blue.300',
      },
    },
  }
});

