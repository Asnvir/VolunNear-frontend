// RegistrationVolunteer.jsx
import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {useRegister} from "../hooks/useRegister.ts";

export const RegistrationVolunteer = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        realName: '',
    });
    const navigate = useNavigate();
    const toast = useToast();
    const {registerVol} = useRegister();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerVol(formData);
            toast({
                title: 'Registration successful.',
                description: "You've successfully registered as a volunteer.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate('/');
        } catch (error) {
            toast({
                title: 'Registration failed.',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={8}>
            <VStack as="form" spacing={4} onSubmit={handleSubmit}>
                <FormControl id="username" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" name="username" value={formData.username} onChange={handleChange} />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                </FormControl>
                <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                </FormControl>
                <FormControl id="realName">
                    <FormLabel>Real Name</FormLabel>
                    <Input type="text" name="realName" value={formData.realName} onChange={handleChange} />
                </FormControl>
                <Button type="submit" colorScheme="blue" width="full">
                    Register
                </Button>
            </VStack>
        </Box>
    );
};

export default RegistrationVolunteer;
