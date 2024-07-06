import React, { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../shared/hooks/useAuthContext.tsx";


const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {login} = useAuthContext()
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        try {
            login(username, password).then(() => navigate('/'));
        } catch (error) {
            setError(error.message);
        }
    }

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
