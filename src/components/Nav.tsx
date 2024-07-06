import {
    Box,
    Flex,
    Link,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';
import { useAuthContext } from "../shared/hooks/useAuthContext.tsx";

export const Nav = () => {
    const { isLoggedIn, logout } = useAuthContext();

    const bgColor = useColorModeValue('black', 'gray.800');
    const textColor = useColorModeValue('white', 'white');
    const linkHoverBgColor = useColorModeValue('gray.700', 'gray.700');

    return (
        <Box>
            <Flex
                bg={bgColor}
                color={textColor}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                align={'center'}
                borderRadius="md"
            >
                <Flex flex={{ base: 1 }} justify={{ base: 'start' }}>
                    <Link
                        href={'/'}
                        fontFamily={'heading'}
                        fontSize={'lg'}
                        fontWeight={700}
                        color={textColor}
                        mr={10}
                    >
                        Logo-IMG
                    </Link>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}
                >
                    <Link
                        px={2}
                        py={1}
                        rounded={'md'}
                        href={'/home'}
                        _hover={{
                            textDecoration: 'none',
                            bg: linkHoverBgColor,
                        }}
                    >
                        Home
                    </Link>
                    <Link
                        px={2}
                        py={1}
                        rounded={'md'}
                        href={'/about'}
                        _hover={{
                            textDecoration: 'none',
                            bg: linkHoverBgColor,
                        }}
                    >
                        About us
                    </Link>
                    <Link
                        px={2}
                        py={1}
                        rounded={'md'}
                        href={'/how-it-works'}
                        _hover={{
                            textDecoration: 'none',
                            bg: linkHoverBgColor,
                        }}
                    >
                        How it works?
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <Link
                                px={2}
                                py={1}
                                rounded={'md'}
                                href={'/profile'}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: linkHoverBgColor,
                                }}
                                color="red.300"
                            >
                                Profile
                            </Link>
                            <Link
                                px={2}
                                py={1}
                                rounded={'md'}
                                onClick={logout}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: linkHoverBgColor,
                                }}
                                color="red.300"
                                cursor="pointer"
                            >
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                px={2}
                                py={1}
                                rounded={'md'}
                                href={'/login'}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: linkHoverBgColor,
                                }}
                                color="teal.300"
                            >
                                Login
                            </Link>

                        </>
                    )}
                </Stack>
            </Flex>
        </Box>
    );
};
