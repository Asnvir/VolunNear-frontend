import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { Box, Button, Input } from "@chakra-ui/react";
import {useLogin} from "../hooks/useLogin.ts";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {login} = useLogin();
    const [error, setError] = useState("");
    const handleLogin = async () => {
        try {
            await login(username,password);
            navigate('/main');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <Box p={4}>
            <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                mb={3}
            />
            <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                mb={3}
            />
            {error && <Box color="red">{error}</Box>}
            <Button onClick={handleLogin}>Login</Button>
        </Box>
    );
};
export default LoginPage;
