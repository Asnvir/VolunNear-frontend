import React, {useState} from 'react';
import {Box, Button, Input} from '@chakra-ui/react';
import {useLogin} from '../hooks/useLogin.ts';
import {useNavigate} from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onLoginSuccess = () => {
    navigate('/');
  };

  const {login, isLoading, error} = useLogin({onSuccess: onLoginSuccess});

  const handleLogin = () => {
    login(username, password);
  };

  return (
    <Box p={4}>
      <Input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        mb={3}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        mb={3}
      />
      {error && <Box color="red">{error}</Box>}
      <Button onClick={handleLogin} disabled={isLoading}>
        Login
      </Button>
    </Box>
  );
};
export default LoginPage;
