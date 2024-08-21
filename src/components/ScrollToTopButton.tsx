import React, {useEffect, useState} from 'react';
import {Button, Flex} from '@chakra-ui/react';
import {FiArrowUpCircle} from 'react-icons/fi';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Flex
      position="fixed"
      bottom="150px"
      right="50px"
      display={isVisible ? 'flex' : 'none'}
      justifyContent="center"
      alignItems="center"
    >
      <Button
        onClick={scrollToTop}
        variant="solid"
        colorScheme="primary"
        borderRadius="full"
        p={6}
        fontSize="2xl"
      >
        <FiArrowUpCircle size="32px" />
      </Button>
    </Flex>
  );
};
