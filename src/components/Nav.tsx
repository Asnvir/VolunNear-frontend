import {
    Box,
    Flex,
    Link,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';
import {useKeycloak} from "@react-keycloak/web";

export const NavBar = () => {
    const {keycloak} = useKeycloak();


    const handleLogout = () => {
        keycloak.logout();
    };


    return (
        <Box>
            <Flex
                bg={useColorModeValue('black', 'gray.800')}
                color={useColorModeValue('white', 'white')}
                minH={'60px'}
                py={{base: 2}}
                px={{base: 4}}
                align={'center'}
                borderRadius="md"
            >
                <Flex flex={{base: 1}} justify={{base: 'start'}}>
                    <Link
                        href={'/'}
                        fontFamily={'heading'}
                        fontSize={'lg'}
                        fontWeight={700}
                        color={useColorModeValue('white', 'white')}
                        mr={10}
                    >
                        Logo-IMG
                    </Link>
                </Flex>

                <Stack
                    flex={{base: 1, md: 0}}
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
                            bg: useColorModeValue('gray.700', 'gray.700'),
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
                            bg: useColorModeValue('gray.700', 'gray.700'),
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
                            bg: useColorModeValue('gray.700', 'gray.700'),
                        }}
                    >
                        How it works?
                    </Link>
                    <Link
                        px={2}
                        py={1}
                        rounded={'md'}
                        href={'/profile'}
                        _hover={{
                            textDecoration: 'none',
                            bg: useColorModeValue('gray.700', 'gray.700'),
                        }}
                        color="red.300"
                    >
                        Profile
                    </Link>
                    <Link
                        px={2}
                        py={1}
                        rounded={'md'}
                        onClick={handleLogout}
                        _hover={{
                            textDecoration: 'none',
                            bg: useColorModeValue('gray.700', 'gray.700'),
                        }}
                        color="red.300"
                        cursor="pointer"
                    >
                        Logout
                    </Link>
                </Stack>
            </Flex>
        </Box>
    );
}